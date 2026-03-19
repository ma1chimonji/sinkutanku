# Dfc Policy Insight
政策情報を、デザイン学生の視点でわかりやすく再編集して公開する Next.js サイトです。

## 開発サーバ起動
```bash
npm install
npm run dev
```

`http://localhost:3000` を開くと確認できます。

## データ運用（複数人投稿）
このプロジェクトは `microCMS` を本番の投稿基盤として使う想定です。  
複数人で管理画面からレポートを追加・編集できます。

詳しい手順は以下を参照してください。

- `docs/content-operations.md`（投稿フロー・ロール設計）
- `docs/microcms-schema.md`（microCMS のコンテンツ定義）

## 環境変数
`.env.example` をコピーして `.env.local` を作ってください。

```bash
cp .env.example .env.local
```

主な変数は以下です。

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `USE_MOCK_DATA` (`true` ならモックデータを使用)
- `REVALIDATE_SECRET`（Webhook で即時反映する場合に使用）

## 即時反映（任意）
microCMS Webhook から `POST /api/revalidate?secret=...` を叩くと、
トップページと詳細ページのキャッシュを即時更新できます。
