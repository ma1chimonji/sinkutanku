import ReportArchive from "@/components/ReportArchive/ReportArchive";
import ReportArchiveView from "@/components/ReportArchive/ReportArchiveView";
import { getArchiveViewModel } from "@/lib/archive";
import { getCategoryList } from "@/lib/microcms";
import { Suspense } from "react";

export default async function HomePage() {
    const categories = await getCategoryList();
    const fallbackViewModel = getArchiveViewModel({ page: 1 }, categories);

    return (
        <Suspense
            fallback={
                <ReportArchiveView
                    categories={categories}
                    {...fallbackViewModel}
                />
            }
        >
            <ReportArchive categories={categories} />
        </Suspense>
    );
}
