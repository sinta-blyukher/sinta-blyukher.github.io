# リポジトリガイドライン

## プロジェクト構成とモジュール配置
- `src/pages/` はルートに対応する Astro ページ（例: `index.astro`, `blog/`）。
- `src/pages/blog/posts/` は Markdown のブログ記事（`title`, `image`, `tags`, `pubDate` などのフロントマター）。
- `src/components/`, `src/layouts/`, `src/utils/` は再利用 UI、レイアウト、補助ロジック。
- `src/assets/` と `src/styles/` は静的アセットと Tailwind 由来のスタイル。
- `public/` はそのまま配信される静的ファイル、`dist/` はビルド出力。

## ビルド・テスト・開発コマンド
- `npm ci`: 依存関係を固定版でインストール（クリーンセットアップ向け）。
- `npm run dev`: Astro の開発サーバーを起動（ホットリロード）。
- `npm run build`: `astro check` の後に `dist/` へビルド。
- `npm run preview`: 本番ビルドをローカルで確認。
- `npm run lint`: Astro と TypeScript の静的解析。
- `npm test`: Vitest の単体テストを一度実行。
- `npm run test:watch`: Vitest を監視モードで実行。
- `npm run ci`: lint、テスト、ビルドを順番に実行。
- `npm run pages:dev`: `wrangler` 経由で Cloudflare Pages のローカル開発。
- `npm run pages:deploy`: ビルドして Cloudflare Pages へデプロイ。

## コーディングスタイルと命名規則
- Astro + TypeScript の標準に従う（`tsconfig.json` で `astro/tsconfigs/strict`）。
- インデントは 2 スペース（Astro / JSON / CSS は既存の規約に合わせる）。
- ファイル名は役割が分かるものにし、ルート構成に沿わせる（例: `src/pages/about.astro`）。
- クラス名は意味が伝わるものを使い、Tailwind のユーティリティ設計に寄せる。

## テスト方針
- 現時点で自動テスト基盤は未設定。
- テストを追加する場合は、ランナーを明記し `package.json` に `npm run test` などを追加する。
- テスト名はツールの慣習に従い（例: `*.test.ts`）、関連コードの近くに置く。

## コミット & PR ガイドライン
- 履歴は短く端的なメッセージが中心（日本語が多い）。変更内容を簡潔に要約する。
- 新しいコマンドを追加した場合は `README.md` と本ドキュメントを更新する。
- PR では変更内容、影響範囲のページ/コンポーネント、UI 変更のスクリーンショットを添付する。

## デプロイと設定メモ
- GitHub Pages は `master` への push で `.github/workflows/astro.yml` が実行される。
- Cloudflare Pages は `wrangler.jsonc` と `wrangler` を利用してデプロイする。

## デザイン方針
- 内部ロジックの変更は行わずに1980年代のUNIX CUIを意識したデザインにしてください。
- 文字入力アニメーションを追加してください追加してください
