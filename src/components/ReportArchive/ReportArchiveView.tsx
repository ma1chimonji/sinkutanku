"use client";

import ReportCard from "@/components/ReportCard/ReportCard";
import { buildArchivePageUrl } from "@/lib/archive";
import type { ArchiveViewModel } from "@/lib/archive";
import Link from "next/link";
import styles from "@/app/page.module.css";

type ReportArchiveViewProps = ArchiveViewModel;

export default function ReportArchiveView({
    reportData,
    currentPage,
    totalPages,
    currentListUrl,
    selectedCategoryName,
    filters,
}: ReportArchiveViewProps) {
    const reports = reportData.contents;

    return (
        <div className={styles.homeContainer}>
            <section
                className={styles.introSection}
                aria-labelledby="home-intro-title"
            >
                <p className={styles.introLabel}>このサイトについて</p>
                <h1 id="home-intro-title" className={styles.introTitle}>
                    政策を、デザイナー視点で整理してわかりやすく伝えるサイトです。
                </h1>
                <p className={styles.introText}>
                    複雑な政策情報を、デザイン学生が図解と要約で構造化しわかりやすい資料として届けます。
                </p>
                <ul className={styles.introPoints}>
                    <li>政策の要点をわかりやすく整理</li>
                    <li>影響と論点を中立的に提示</li>
                    <li>月1回の更新で最新動向を反映</li>
                </ul>
            </section>

            <p className={styles.resultsInfo}>
                {reportData.totalCount}件のレポート
                {selectedCategoryName && ` — カテゴリ: ${selectedCategoryName}`}
                {filters.q && ` — 検索: 「${filters.q}」`}
                {filters.category &&
                    !selectedCategoryName &&
                    ` — カテゴリ: ${filters.category}`}
            </p>

            {reports.length > 0 ? (
                <section className={styles.archiveSection}>
                    <div className={styles.archiveGrid}>
                        {reports.map((report, index) => (
                            <ReportCard
                                key={report.id}
                                report={report}
                                backTo={currentListUrl}
                                animationIndex={index}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav
                            className={styles.pagination}
                            aria-label="ページネーション"
                        >
                            {currentPage > 1 && (
                                <Link
                                    href={buildArchivePageUrl({
                                        ...filters,
                                        page: currentPage - 1,
                                    })}
                                    className={styles.pageLink}
                                >
                                    ←
                                </Link>
                            )}

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <Link
                                    key={page}
                                    href={buildArchivePageUrl({
                                        ...filters,
                                        page,
                                    })}
                                    className={`${styles.pageLink} ${
                                        page === currentPage
                                            ? styles.pageLinkActive
                                            : ""
                                    }`}
                                    aria-current={
                                        page === currentPage ? "page" : undefined
                                    }
                                >
                                    {page}
                                </Link>
                            ))}

                            {currentPage < totalPages && (
                                <Link
                                    href={buildArchivePageUrl({
                                        ...filters,
                                        page: currentPage + 1,
                                    })}
                                    className={styles.pageLink}
                                >
                                    →
                                </Link>
                            )}
                        </nav>
                    )}
                </section>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📭</div>
                    <p className={styles.emptyText}>
                        条件に合うレポートが見つかりませんでした。
                    </p>
                </div>
            )}
        </div>
    );
}
