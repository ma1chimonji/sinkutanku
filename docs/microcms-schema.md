# microCMS スキーマ定義

このプロジェクトの型は `src/types/types.ts` を基準にしています。  
microCMS の API は最低限、以下の3エンドポイントを用意してください。

## 1. `reports`
- `title` (テキスト / 必須)
- `slug` (テキスト / 必須 / 一意)
- `description` (テキストエリア / 必須)
- `content` (リッチエディタ / 必須)
- `eyecatch` (画像 / 任意)
- `pdf` (ファイル / 任意)
- `pdfUrl` (テキスト / 任意)
- `category` (参照: categories / 必須)
- `tags` (複数参照: tags / 任意)
- `emphasis` (セレクト: `hero` or `standard` / 任意)
- `aspectRatio` (テキスト: `16/9` など / 任意)

## 2. `categories`
- `name` (テキスト / 必須)
- `slug` (テキスト / 必須 / 一意)
- `description` (テキストエリア / 任意)
- `color` (テキスト / 任意)

## 3. `tags`
- `name` (テキスト / 必須)
- `slug` (テキスト / 必須 / 一意)

## 動作確認チェック
- 一覧表示: `/`
- 詳細表示: `/reports/[slug]`
- カテゴリ絞り込み: `/?category=<category-slug>`
- 検索: `/?q=<keyword>`

## 注意
- `slug` を変更すると既存URLが変わるため、公開後の変更は最小限にしてください。
- `pdf` と `pdfUrl` はどちらか一方だけでも動作します。
