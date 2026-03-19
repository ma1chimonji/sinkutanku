// 一覧で使うレポートカードです。
// タイトル・カテゴリ・公開日を表示して詳細ページへ遷移させます。
import type { Report } from "@/types/types";
import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./ReportCard.module.css";

interface ReportCardProps {
    report: Report;
    emphasisOverride?: "hero" | "standard";
    className?: string;
    // 一覧の状態（カテゴリ/検索/ページ番号）を保った戻り先
    backTo?: string;
    // 一覧表示時のアニメーション順
    animationIndex?: number;
}

function formatDate(dateString: string): string {
    // 表示形式: 2026年2月17日
    const d = new Date(dateString);
    return d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function ReportCard({ report, className, backTo, animationIndex = 0 }: ReportCardProps) {
    const detailHref = backTo
        ? `/reports/${report.slug}?from=${encodeURIComponent(backTo)}`
        : `/reports/${report.slug}`;
    const style = {
        "--card-delay": `${Math.min(animationIndex * 70, 700)}ms`,
    } as CSSProperties;

    return (
        <Link
            // カード全体をクリック可能にする
            href={detailHref}
            className={`${styles.card}${className ? ` ${className}` : ""}`}
            style={style}
        >
            {/* ビジュアル */}
            <div
                className={styles.imageWrap}
                style={{ aspectRatio: "16 / 9" }}
            >
                {report.eyecatch ? (
                    <img
                        className={styles.image}
                        src={report.eyecatch.url}
                        alt={report.title}
                        loading="lazy"
                        width={report.eyecatch.width}
                        height={report.eyecatch.height}
                    />
                ) : (
                    <div className={styles.imagePlaceholder} />
                )}
            </div>

            {/* テキスト情報 */}
            <div className={styles.content}>
                {/* ステータス（カテゴリ） */}
                <span
                    className={styles.status}
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

                {/* 一文要約 */}
                <h3 className={styles.title}>{report.title}</h3>

                {/* 更新日付 */}
                <time className={styles.date} dateTime={report.publishedAt}>
                    {formatDate(report.publishedAt)}
                </time>
            </div>
        </Link>
    );
}
