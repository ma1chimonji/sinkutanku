import type { Category, PaginatedResponse, Report } from "@/types/types";
import { getMockReports } from "./mock-data";

export const ITEMS_PER_PAGE = 12;

type SearchParamReader =
    | URLSearchParams
    | { get(name: string): string | null }
    | Record<string, string | undefined | null>;

export interface ArchiveState {
    category?: string;
    tag?: string;
    q?: string;
    page: number;
}

export interface ArchiveViewModel {
    reportData: PaginatedResponse<Report>;
    currentPage: number;
    totalPages: number;
    currentListUrl: string;
    selectedCategoryName?: string;
    filters: Omit<ArchiveState, "page">;
}

function hasGetter(
    source: SearchParamReader
): source is URLSearchParams | { get(name: string): string | null } {
    return typeof (source as { get?: unknown }).get === "function";
}

function readValue(source: SearchParamReader, key: string): string | undefined {
    if (hasGetter(source)) {
        return source.get(key) ?? undefined;
    }

    const record = source as Record<string, string | undefined | null>;
    return record[key] ?? undefined;
}

export function normalizeArchiveState(source: SearchParamReader): ArchiveState {
    const pageValue = Number(readValue(source, "page") ?? "1");

    return {
        category: readValue(source, "category") || undefined,
        tag: readValue(source, "tag") || undefined,
        q: readValue(source, "q")?.trim() || undefined,
        page: Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1,
    };
}

export function buildArchivePageUrl(state: Partial<ArchiveState>): string {
    const params = new URLSearchParams();

    if (state.category) params.set("category", state.category);
    if (state.tag) params.set("tag", state.tag);
    if (state.q) params.set("q", state.q);
    if (state.page && state.page > 1) params.set("page", String(state.page));

    const query = params.toString();

    return `/${query ? `?${query}` : ""}`;
}

export function getArchiveViewModel(
    state: ArchiveState,
    categories: Category[]
): ArchiveViewModel {
    const initialData = getMockReports({
        ...state,
        limit: ITEMS_PER_PAGE,
    });
    const totalPages = Math.ceil(initialData.totalCount / ITEMS_PER_PAGE);
    const currentPage =
        totalPages > 0 ? Math.min(state.page, totalPages) : 1;
    const reportData =
        currentPage === state.page
            ? initialData
            : getMockReports({
                  ...state,
                  page: currentPage,
                  limit: ITEMS_PER_PAGE,
              });

    return {
        reportData,
        currentPage,
        totalPages,
        currentListUrl: buildArchivePageUrl({ ...state, page: currentPage }),
        selectedCategoryName: state.category
            ? categories.find((category) => category.slug === state.category)?.name ??
              state.category
            : undefined,
        filters: {
            category: state.category,
            tag: state.tag,
            q: state.q,
        },
    };
}
