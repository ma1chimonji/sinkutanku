# コンテンツ運用ガイド（複数人投稿）

## 方針
- 投稿は `microCMS` の管理画面から行う
- 開発者がコードを触らなくても、編集者がレポートを追加できる形にする
- 公開後は Webhook でサイトを即時更新する

## 役割（最小構成）
- `オーナー`: スキーマ変更、APIキー管理、権限管理
- `編集者`: レポートの作成・編集・公開
- `閲覧者`: 下書きレビューのみ（必要なら）

## 投稿フロー
1. microCMS の `reports` で「新規追加」
2. `title / slug / description / content / category / tags` を入力
3. 必要なら `eyecatch / pdf` をアップロード
4. 「下書き保存」してレビュー
5. 「公開」する
6. 公開直後にサイトで表示確認（一覧・詳細・検索）

## 運用ルール（推奨）
- `slug` は英小文字 + ハイフン（例: `social-security-2026`）
- `description` は 60〜120 文字目安
- `content` の見出しは `h2` から始める
- 画像は横長（16:9）を推奨
- PDFがある場合は `pdf` フィールドにアップロード

## 即時反映（Webhook）
microCMS で公開したあと、サイトのキャッシュを即時更新するために
Webhook を設定します。

- URL: `https://<your-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`
- メソッド: `POST`
- 対象: `reports` の公開・更新（必要なら削除も）

これでトップページと詳細ページの更新待ち時間を短縮できます。
