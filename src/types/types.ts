// ============================================================
// Types — CMS Data Structures
// ============================================================
// 型定義ファイルです。
// 「Report がどんな項目を持つか」を1箇所に集約して、
// コンポーネント間でデータ形式を統一します。

/** microCMS Image */
export interface CMSImage {
  url: string;
  width: number;
  height: number;
}

/** microCMS File */
export interface CMSFile {
  url: string;
  fileName?: string;
  fileSize?: number;
}

/** Category */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

/** Tag */
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/** Report Card Layout Emphasis */
export type ReportEmphasis = "hero" | "standard";

/** Report (単一記事) */
export interface Report {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string; // リッチエディタ HTML
  eyecatch?: CMSImage;
  pdf?: CMSFile;
  pdfUrl?: string;
  category: Category;
  tags: Tag[];
  emphasis: ReportEmphasis;
  aspectRatio: string; // e.g. "16/9"
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Report Card Layout */
export interface ReportCardLayout {
  emphasis: ReportEmphasis;
  aspectRatio: `${number}/${number}`;
}

/** Paginated List Response */
export interface PaginatedResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/** Report List Query Params */
export interface ReportListQuery {
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}
