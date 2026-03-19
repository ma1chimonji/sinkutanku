// microCMS Webhook から呼び出して、公開済みページのキャッシュを即時更新します。
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type AnyRecord = Record<string, unknown>;

function getSlugFromPayload(payload: unknown): string | undefined {
    if (!payload || typeof payload !== "object") return undefined;
    const p = payload as AnyRecord;

    const direct = p.slug;
    if (typeof direct === "string" && direct.length > 0) return direct;

    const contents = p.contents;
    if (contents && typeof contents === "object") {
        const s = (contents as AnyRecord).slug;
        if (typeof s === "string" && s.length > 0) return s;
    }

    const content = p.content;
    if (content && typeof content === "object") {
        const s = (content as AnyRecord).slug;
        if (typeof s === "string" && s.length > 0) return s;
    }

    return undefined;
}

export async function POST(request: NextRequest) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
        return NextResponse.json(
            { ok: false, message: "REVALIDATE_SECRET is not set" },
            { status: 500 }
        );
    }

    const token = request.nextUrl.searchParams.get("secret");
    if (token !== secret) {
        return NextResponse.json(
            { ok: false, message: "Invalid secret" },
            { status: 401 }
        );
    }

    let payload: unknown = {};
    try {
        payload = await request.json();
    } catch {
        // body が空の Webhook でも revalidate 自体は実行する
    }

    const slug = getSlugFromPayload(payload);
    const paths = ["/", "/reports", "/reports/[slug]"];

    // LP一覧と動的詳細を再生成対象にする
    revalidatePath("/");
    revalidatePath("/reports");
    revalidatePath("/reports/[slug]", "page");

    // slug が判定できた場合は、その詳細ページも明示的に更新
    if (slug) {
        const detailPath = `/reports/${slug}`;
        revalidatePath(detailPath);
        paths.push(detailPath);
    }

    return NextResponse.json({
        ok: true,
        message: "Revalidation triggered",
        paths,
    });
}
