## Sinta — Astro Site

- Framework: Astro 5 + Vite
- Styling: Tailwind CSS v4
- Blog Content: Markdown files in `src/pages/blog/posts/`
- Deploy targets: GitHub Pages (workflow included), Cloudflare Pages (wrangler scripts)

### Prerequisites
- Node.js 20.x
- npm 10+ (or your preferred package manager)

### Setup
1) Install dependencies
- `npm ci`

### Commands
- `npm run dev`: Start local dev server
- `npm run build`: Type-check and build to `dist/`
- `npm run preview`: Preview the production build
- `npm run pages:dev`: Cloudflare Pages local dev (wrangler required)
- `npm run pages:deploy`: Build and deploy to Cloudflare Pages

### Deployment
- GitHub Pages: pushing to `master` triggers `.github/workflows/astro.yml` to build and deploy.
- Cloudflare Pages: use `npm run pages:deploy` (requires Cloudflare account and `wrangler` auth).

### Notes
- Blog posts are managed as Markdown files in `src/pages/blog/posts/`. Each post should have frontmatter with `title`, `image`, `tags`, `pubDate`, and optionally `category` and `description`.
- `astro.config.mjs` is currently set up with the Cloudflare adapter. If deploying exclusively to GitHub Pages (static hosting), consider using the default static output or an appropriate adapter.
