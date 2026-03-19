// /reports へ来た場合は、LP（/）へ統一的に戻します。
import { redirect } from "next/navigation";

interface ReportsRedirectPageProps {
    searchParams: Promise<{
        category?: string;
        tag?: string;
        q?: string;
        page?: string;
    }>;
}

export default async function ReportsRedirectPage({ searchParams }: ReportsRedirectPageProps) {
    const params = await searchParams;
    const p = new URLSearchParams();
    if (params.category) p.set("category", params.category);
    if (params.tag) p.set("tag", params.tag);
    if (params.q) p.set("q", params.q);
    if (params.page) p.set("page", params.page);
    const qs = p.toString();
    redirect(`/${qs ? `?${qs}` : ""}`);
}
