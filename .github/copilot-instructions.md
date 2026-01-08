# Copilot Instructions for Camilo Salazar Ocampo Portfolio

This project is a modern portfolio/blog built with Astro and Tailwind CSS. Use these guidelines to maximize AI coding agent productivity and maintain project conventions.

## Architecture Overview
- **Framework:** Astro (static site generator)
- **Styling:** Tailwind CSS
- **Content:** Markdown files in `src/content/blog/` for blog posts
- **Layouts:** Shared in `src/layouts/`
- **Pages:** Astro files in `src/pages/` (e.g., `index.astro`, `blog/index.astro`, dynamic `[slug].astro`)
- **Config:** Site/content config in `src/content/config.ts`

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start dev server:** `npm run dev` (default port: 4321)
- **Build for production:** `npm run build` (output: `dist/`)
- **Preview build:** `npm run preview`
- **Content updates:** Add/edit Markdown files in `src/content/blog/`
- **Layout changes:** Edit Astro components in `src/layouts/`

## Project-Specific Patterns
- **Blog posts:** Each Markdown file in `src/content/blog/` must include frontmatter: `title`, `description`, `pubDate`, `category`, `tags`, `heroImage`, `readingTime`.
- **Post listing:** Blog index (`src/pages/blog/index.astro`) sorts posts by `pubDate` descending and displays featured, next 5, and remaining articles in separate grids.
- **Dynamic routing:** Blog post pages use `[slug].astro` for dynamic routes.
- **Stats:** Blog index computes and displays stats (total posts, average reading time, unique topics) from post metadata.
- **Newsletter CTA:** Present but not wired to backend; form is static.
- **Dark/Light mode:** Handled via Tailwind CSS classes and Astro layout logic.

## Integration Points
- **No backend/serverless functions** by default; all content is statically generated.
- **External images:** Fallback images use `placehold.co` if no `heroImage` is provided.
- **No custom test or lint commands** defined; use standard Astro/TypeScript/Tailwind workflows.

## Conventions & Examples
- **Astro components:** Use `.astro` files for pages and layouts; import with relative paths.
- **Tailwind classes:** Use utility classes for all styling; avoid custom CSS except in `src/styles/global.css`.
- **Content metadata:** Example frontmatter for a blog post:
  ```markdown
  ---
  title: "Example Title"
  description: "Short summary."
  pubDate: 2024-01-01
  category: "Data Engineering"
  tags: ["cloud", "astro"]
  heroImage: "/path/to/image.jpg"
  readingTime: 5
  ---
  ```
- **Do not add Node.js/Express APIs**; keep all logic static unless project direction changes.

## Key Files & Directories
- `src/pages/blog/index.astro`: Blog listing and stats logic
- `src/pages/blog/[slug].astro`: Dynamic blog post rendering
- `src/content/blog/`: Markdown blog posts
- `src/layouts/Layout.astro`: Shared layout
- `src/content/config.ts`: Site/content config
- `public/`: Static assets

---

**For questions or unclear conventions, ask for clarification or review recent commits for examples.**
