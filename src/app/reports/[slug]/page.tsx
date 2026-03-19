// レポート詳細ページです。
// 1件のレポート本文を表示し、PDFがあればボタンから開けるようにします。
import { getReportBySlug } from "@/lib/microcms";
import { access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

interface ReportDetailProps {
    // URL の [slug] 部分（例: /reports/social-security-reform-2026）
    params: Promise<{ slug: string }>;
    // 一覧→詳細遷移時に引き継ぐクエリ（例: ?from=/%3Fcategory%3Dsocial-security）
    searchParams: Promise<{ from?: string }>;
}

// 記事ごとの title/description（SEO用）を動的に作成
export async function generateMetadata({
    params,
}: ReportDetailProps): Promise<Metadata> {
    const { slug } = await params;
    const report = await getReportBySlug(slug);
    if (!report) return { title: "レポートが見つかりません" };
    return {
        title: report.title,
        description: report.description,
        openGraph: {
            title: report.title,
            description: report.description,
            type: "article",
            publishedTime: report.publishedAt,
            ...(report.eyecatch && {
                images: [{ url: report.eyecatch.url, width: report.eyecatch.width, height: report.eyecatch.height }],
            }),
        },
    };
}

function formatDate(dateString: string): string {
    // 表示形式: 2026年2月17日
    return new Date(dateString).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function ReportDetailPage({ params, searchParams }: ReportDetailProps) {
    const { slug } = await params;
    const query = await searchParams;
    const report = await getReportBySlug(slug);

    if (!report) {
        // slug に対応する記事がないときは 404 へ
        notFound();
    }

    // PDFリンクの優先順位:
    // 1) microCMS の file フィールド
    // 2) microCMS の文字列URL
    // 3) public/pdf/{slug}.pdf（ローカル配置）
    const localPdfPath = path.join(process.cwd(), "public", "pdf", `${report.slug}.pdf`);
    const hasLocalPdf = await access(localPdfPath, constants.F_OK)
        .then(() => true)
        .catch(() => false);
    const pdfUrl = report.pdf?.url ?? report.pdfUrl ?? (hasLocalPdf ? `/pdf/${report.slug}.pdf` : undefined);
    const hasPdf = Boolean(pdfUrl);

    // 戻り先は from を最優先。値が不正な場合はトップへ戻す。
    const backHref =
        query.from && query.from.startsWith("/") && !query.from.startsWith("//")
            ? query.from
            : "/";

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailInner}>
                <div className={styles.actionRow}>
                    <Link href={backHref} className={styles.backLink}>
                        ← 一覧に戻る
                    </Link>
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
                        <span className={`${styles.pdfButton} ${styles.pdfButtonDisabled}`}>
                            PDF準備中
                        </span>
                    )}
                </div>

                <article className={styles.detailArticle}>
                    {report.eyecatch && (
                        <figure className={styles.heroImage}>
                            <img
                                className={styles.heroImg}
                                src={report.eyecatch.url}
                                alt={report.title}
                                width={report.eyecatch.width}
                                height={report.eyecatch.height}
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
                            <time className={styles.date} dateTime={report.publishedAt}>
                                {formatDate(report.publishedAt)}
                            </time>
                        </div>

                        <h1 className={styles.articleTitle}>{report.title}</h1>
                        <p className={styles.articleDescription}>{report.description}</p>

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
