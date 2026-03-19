// トップページ（LP）です。
// このページを「唯一のレポート一覧ページ」として使います。
import ReportCard from "@/components/ReportCard/ReportCard";
import { getCategoryList, getReportList } from "@/lib/microcms";
import Link from "next/link";
import styles from "./page.module.css";

const ITEMS_PER_PAGE = 12;

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // 一覧データとカテゴリ一覧を同時に取得
  const [reportData, categories] = await Promise.all([
    getReportList({
      category: params.category,
      tag: params.tag,
      q: params.q,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }),
    getCategoryList(),
  ]);

  const reports = reportData.contents;
  const totalPages = Math.ceil(reportData.totalCount / ITEMS_PER_PAGE);

  // ページ番号リンク用URLを作る
  function buildPageUrl(page: number): string {
    const p = new URLSearchParams();
    if (params.category) p.set("category", params.category);
    if (params.tag) p.set("tag", params.tag);
    if (params.q) p.set("q", params.q);
    if (page > 1) p.set("page", String(page));
    const qs = p.toString();
    return `/${qs ? `?${qs}` : ""}`;
  }

  // 今見ている一覧状態（カテゴリ/検索/ページ）を詳細ページへ渡す
  const currentListUrl = buildPageUrl(currentPage);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.introSection} aria-labelledby="home-intro-title">
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
        {params.category &&
          ` — カテゴリ: ${categories.find((c) => c.slug === params.category)?.name ?? params.category}`}
        {params.q && ` — 検索: 「${params.q}」`}
      </p>

      {reports.length > 0 ? (
        <section className={styles.archiveSection}>
          <div className={styles.archiveGrid}>
            {/* 取得したレポートをカードとして並べて表示 */}
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
            <nav className={styles.pagination} aria-label="ページネーション">
              {currentPage > 1 && (
                <Link href={buildPageUrl(currentPage - 1)} className={styles.pageLink}>
                  ←
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={buildPageUrl(page)}
                  className={`${styles.pageLink} ${page === currentPage ? styles.pageLinkActive : ""}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={buildPageUrl(currentPage + 1)} className={styles.pageLink}>
                  →
                </Link>
              )}
            </nav>
          )}
        </section>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <p className={styles.emptyText}>該当するレポートが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
