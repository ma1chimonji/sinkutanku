// ============================================================
// microCMS Client
// ============================================================
// データ取得の窓口ファイルです。
// ここだけ見れば「どこからデータを取るか」が分かるようにしています。

import type { Category, PaginatedResponse, Report } from "@/types/types";
import { getMockCategories, getMockReportBySlug, getMockReports } from "./mock-data";

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN ?? "";
const API_KEY = process.env.MICROCMS_API_KEY ?? "";
// APIキー/ドメイン未設定、または明示的にモック指定した場合は mock-data.ts を使う
const USE_MOCK =
    process.env.USE_MOCK_DATA === "true" || !API_KEY || !SERVICE_DOMAIN;

async function fetchCMS<T>(
    endpoint: string,
    queries?: Record<string, string | number>
): Promise<T> {
    // クエリ文字列（?limit=10 など）を組み立てる
    const params = new URLSearchParams();
    if (queries) {
        Object.entries(queries).forEach(([key, val]) => {
            params.set(key, String(val));
        });
    }
    const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?${params.toString()}`;
    const res = await fetch(url, {
        headers: { "X-MICROCMS-API-KEY": API_KEY },
        next: { revalidate: 60 },
    });
    if (!res.ok) {
        throw new Error(`microCMS fetch error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

// --- Public API ---
// 以降の関数は「画面側から直接呼ぶ」公開関数です。

export async function getReportList(query?: {
    category?: string;
    tag?: string;
    q?: string;
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<Report>> {
    // 開発中はモックデータを返す
    if (USE_MOCK) {
        return getMockReports(query);
    }

    const limit = query?.limit ?? 10;
    const offset = ((query?.page ?? 1) - 1) * limit;
    const filters: string[] = [];
    if (query?.category) {
        filters.push(`category[equals]${query.category}`);
    }
    if (query?.tag) {
        filters.push(`tags[contains]${query.tag}`);
    }

    // microCMS側の全文検索(q) + フィルタを組み合わせて取得
    return fetchCMS<PaginatedResponse<Report>>("reports", {
        limit,
        offset,
        ...(filters.length > 0 ? { filters: filters.join("[and]") } : {}),
        ...(query?.q ? { q: query.q } : {}),
        orders: "-publishedAt",
    });
}

export async function getReportBySlug(
    slug: string
): Promise<Report | undefined> {
    if (USE_MOCK) {
        return getMockReportBySlug(slug);
    }

    // slugで1件取得
    const res = await fetchCMS<PaginatedResponse<Report>>("reports", {
        filters: `slug[equals]${slug}`,
        limit: 1,
    });
    return res.contents[0];
}

export async function getCategoryList(): Promise<Category[]> {
    if (USE_MOCK) {
        return getMockCategories();
    }

    const res = await fetchCMS<PaginatedResponse<Category>>("categories", {
        limit: 100,
    });
    return res.contents;
}
