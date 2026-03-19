"use client";

import { getArchiveViewModel, normalizeArchiveState } from "@/lib/archive";
import type { Category } from "@/types/types";
import { useSearchParams } from "next/navigation";
import ReportArchiveView from "./ReportArchiveView";

interface ReportArchiveProps {
    categories: Category[];
}

export default function ReportArchive({ categories }: ReportArchiveProps) {
    const searchParams = useSearchParams();
    const viewModel = getArchiveViewModel(
        normalizeArchiveState(searchParams),
        categories
    );

    return <ReportArchiveView categories={categories} {...viewModel} />;
}
