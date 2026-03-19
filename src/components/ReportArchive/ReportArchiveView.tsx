"use client";

import ReportCard from "@/components/ReportCard/ReportCard";
import { buildArchivePageUrl } from "@/lib/archive";
import type { ArchiveViewModel } from "@/lib/archive";
import type { Category } from "@/types/types";
import Link from "next/link";
import styles from "@/app/page.module.css";

interface ReportArchiveViewProps extends ArchiveViewModel {
    categories: Category[];
}

export default function ReportArchiveView({
    categories,
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
                <p className={styles.introLabel}>Portfolio Mockup</p>
                <h1 id="home-intro-title" className={styles.introTitle}>
                    政策やシンクタンク系の情報を、読みやすいカードUIで見せる想定の
                    デモサイトです。
                </h1>
                <p className={styles.introText}>
                    もともとmicroCMS運用を想定していた構成を、ポートフォリオ掲載用に
                    仮データで静的公開できる形へ置き換えています。
                </p>
                <ul className={styles.introPoints}>
                    <li>カード一覧から詳細記事へ遷移</li>
                    <li>カテゴリ絞り込みとキーワード検索</li>
                    <li>GitHub Pages でそのまま閲覧可能</li>
                </ul>
            </section>

            <p className={styles.resultsInfo}>
                仮データで公開中
                {" · "}
                {reportData.totalCount}件のレポート
                {selectedCategoryName && ` · カテゴリ: ${selectedCategoryName}`}
                {filters.q && ` · 検索: 「${filters.q}」`}
                {filters.category &&
                    !selectedCategoryName &&
                    ` · カテゴリ: ${filters.category}`}
                {!filters.category && categories.length > 0 && " · 画面上部でカテゴリ切替"}
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
