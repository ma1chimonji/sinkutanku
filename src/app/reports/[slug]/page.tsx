import ReportBackLink from "@/components/ReportBackLink/ReportBackLink";
import { getReportBySlug } from "@/lib/microcms";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { withBasePath } from "@/lib/site-config";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";

interface ReportDetailProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return MOCK_REPORTS.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
    params,
}: ReportDetailProps): Promise<Metadata> {
    const { slug } = await params;
    const report = await getReportBySlug(slug);

    if (!report) {
        return { title: "レポートが見つかりません" };
    }

    return {
        title: report.title,
        description: report.description,
        openGraph: {
            title: report.title,
            description: report.description,
            type: "article",
            publishedTime: report.publishedAt,
            ...(report.eyecatch && {
                images: [
                    {
                        url: report.eyecatch.url,
                        width: report.eyecatch.width,
                        height: report.eyecatch.height,
                    },
                ],
            }),
        },
    };
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function ReportDetailPage({ params }: ReportDetailProps) {
    const { slug } = await params;
    const report = await getReportBySlug(slug);

    if (!report) {
        notFound();
    }

    const localPdfPath = path.join(
        process.cwd(),
        "public",
        "pdf",
        `${report.slug}.pdf`
    );
    const hasLocalPdf = await access(localPdfPath, constants.F_OK)
        .then(() => true)
        .catch(() => false);
    const pdfUrl =
        report.pdf?.url ??
        report.pdfUrl ??
        (hasLocalPdf ? withBasePath(`/pdf/${report.slug}.pdf`) : undefined);
    const hasPdf = Boolean(pdfUrl);

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailInner}>
                <div className={styles.actionRow}>
                    <Suspense
                        fallback={
                            <Link href="/" className={styles.backLink}>
                                ← 一覧に戻る
                            </Link>
                        }
                    >
                        <ReportBackLink className={styles.backLink} />
                    </Suspense>
                    {hasPdf ? (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.pdfButton}
                        >
                            PDF版はこちら
                        </a>
                    ) : (
                        <span
                            className={`${styles.pdfButton} ${styles.pdfButtonDisabled}`}
                        >
                            PDF準備中
                        </span>
                    )}
                </div>

                <article className={styles.detailArticle}>
                    {report.eyecatch && (
                        <figure className={styles.heroImage}>
                            <Image
                                className={styles.heroImg}
                                src={report.eyecatch.url}
                                alt={report.title}
                                width={report.eyecatch.width}
                                height={report.eyecatch.height}
                                sizes="(max-width: 82rem) 100vw, 82rem"
                                unoptimized
                            />
                        </figure>
                    )}

                    <header className={styles.articleHeader}>
                        <div className={styles.metaRow}>
                            <span
                                className={styles.categoryTag}
                                style={
                                    report.category.color
                                        ? {
                                              backgroundColor: `${report.category.color}15`,
                                              color: report.category.color,
                                          }
                                        : undefined
                                }
                            >
                                {report.category.name}
                            </span>
                            <time
                                className={styles.date}
                                dateTime={report.publishedAt}
                            >
                                {formatDate(report.publishedAt)}
                            </time>
                        </div>

                        <h1 className={styles.articleTitle}>{report.title}</h1>
                        <p className={styles.articleDescription}>
                            {report.description}
                        </p>

                        {report.tags.length > 0 && (
                            <div className={styles.tags}>
                                {report.tags.map((tag) => (
                                    <span key={tag.id} className={styles.tag}>
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </header>

                    <div
                        className={styles.articleContent}
                        dangerouslySetInnerHTML={{ __html: report.content }}
                    />
                </article>
            </div>
        </div>
    );
}
