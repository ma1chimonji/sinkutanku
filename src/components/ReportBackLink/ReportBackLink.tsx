"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ReportBackLinkProps {
    className?: string;
}

export default function ReportBackLink({ className }: ReportBackLinkProps) {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const backHref =
        from && from.startsWith("/") && !from.startsWith("//") ? from : "/";

    return (
        <Link href={backHref} className={className}>
            ← 一覧に戻る
        </Link>
    );
}
