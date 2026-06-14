## Sinta — Astro Site

- Framework: Astro 6 + Vite
- Styling: Tailwind CSS v4
- Blog Content: Markdown files in `src/pages/blog/posts/`
- Deploy targets: GitHub Pages (workflow included), Cloudflare Pages (wrangler scripts)

### Prerequisites
- Node.js 22.12.0 or newer
- npm 10+ (or your preferred package manager)

### Setup
1) Install dependencies
- `npm ci`

### Commands
- `npm run dev`: Start local dev server
- `npm run build`: Type-check and build to `dist/`
- `npm run preview`: Preview the production build
- `npm run pages:dev`: Build and start Cloudflare Pages locally
- `npm run pages:deploy`: Build and deploy to Cloudflare Pages

### Deployment
- GitHub Pages: pushing to `master` triggers `.github/workflows/astro.yml` to build and deploy.
- Cloudflare Pages: use `npm run pages:deploy` (requires Cloudflare account and `wrangler` auth).

### Notes
- Blog posts are managed as Markdown files in `src/pages/blog/posts/`. Each post should have frontmatter with `title`, `image`, `tags`, `pubDate`, and optionally `category` and `description`.
- The site uses Astro's static output, which can be deployed directly to GitHub Pages or Cloudflare Pages.
