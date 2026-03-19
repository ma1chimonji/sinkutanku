# SINKUTANKU Portfolio Mock

政策・シンクタンク系メディアを想定したポートフォリオ用の `Next.js` サイトです。  
もともと `microCMS` 管理を前提にしていましたが、現在は仮データでそのまま見られる静的公開版として構成しています。

## ローカル確認

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## GitHub Pages 公開

- `main` へ push すると `.github/workflows/deploy-pages.yml` で `GitHub Pages` にデプロイされます
- デプロイ時は `USE_MOCK_DATA=true` でビルドするため、APIキーなしで公開できます
- 本番公開URL: `https://ma1chimonji.github.io/sinkutanku/`

## データソース

- 既定では `src/lib/mock-data.ts` の仮データを使います
- `microCMS` を再接続したい場合は `.env.local` に以下を設定してください

```bash
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=
USE_MOCK_DATA=false
```

## 補足

- カテゴリ絞り込み・検索・ページネーションは静的公開でも動くようにクライアント側で処理しています
- 旧 `microCMS` 設計メモは `docs/` に残しています
