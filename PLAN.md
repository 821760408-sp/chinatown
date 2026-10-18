# Personal Website Plan

Goals: a portfolio, a place for writing, and a home for the occasional small web app.
Constraints: no WordPress, open-source tools, cheap or free to run, easy to move later.

## Phase 1 — Foundations (version control, hosting, tech stack)

### Version control: Git + GitHub
- Local Git repo in this folder, `main` as the default branch.
- Remote on GitHub (`gh` is already logged in as `821760408-sp`).
- Workflow: commit to `main` for small changes; use a branch + PR for larger ones
  so the preview build runs before it goes live.
- Content lives in the repo as Markdown, so the whole site (code + writing) is
  versioned, diffable and portable. No database.

### Tech stack: Astro (MIT licensed)
| Need | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) 7 | Static output by default, Markdown-first, ships zero JS unless a page needs it |
| Texts / posts | Markdown & MDX in content collections | Plain files, typed frontmatter, no CMS lock-in |
| Portfolio | A `projects` content collection | Same authoring flow as posts |
| Simple web apps | Astro "islands" (vanilla JS, or Preact/Svelte if needed) or a standalone static app under `/apps/<name>/` | Each app only loads its own JS |
| Styling | Plain CSS with custom properties | No build-time dependency to maintain |
| Extras | `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss` | Rich posts, SEO, a feed for readers |

Alternatives considered: **Hugo** (fastest builds, but Go templates are awkward for
interactive apps), **Eleventy** (great, but less built-in structure for islands),
**Next.js** (overkill and pushes toward Vercel). WordPress excluded by request.

### Hosting: GitHub Pages, deployed by GitHub Actions
- Free, HTTPS included, custom domain supported.
- Every push to `main` builds the site and publishes `dist/`.
- The output is plain static files, so moving later is a config change, not a rewrite.
  Fallbacks: **Codeberg Pages** (fully OSS host), **Cloudflare Pages** / **Netlify**
  (if server functions are ever needed), or a small VPS with **Caddy**.
- Note: on a free GitHub plan, Pages requires the repo to be **public**.

### Phase 1 checklist
- [x] Pick stack and host (this document)
- [x] `git init`, `.gitignore`, first commit
- [x] Scaffold Astro with home, portfolio, writing and apps sections
- [x] GitHub Actions workflow for Pages
- [x] Create the GitHub repo and push — https://github.com/821760408-sp/chinatown
- [x] Turn on Pages (source: GitHub Actions) — live at https://821760408-sp.github.io/chinatown/

## Phase 2 — Web 1.0 redesign & 2026 Music Retro
Full plan: **[PHASE-2.md](PHASE-2.md)**
- Restyle the site as a ca. 2000 personal homepage (each region gets its own look).
- Turn `/` into a front door linking to "regions" (sub-projects).
- First region: a 2026 music retrospective with writing and listening links.
- Move Work / Writing / Apps into regions (`/work/`, `/writing/`, `/lab/`).

## Phase 3 — Domain & polish
- Buy a domain (any registrar; Porkbun / Cloudflare Registrar are cheap), point it at
  GitHub Pages, enforce HTTPS.
- Privacy-friendly analytics if wanted (self-hosted **Umami** or **Plausible CE**,
  or GoatCounter).
- Lighthouse / accessibility pass, Open Graph images, favicon.

## Phase 4 — Web apps
- First app as an island or under `/apps/<name>/`.
- If an app ever needs a backend: a small serverless function (Cloudflare Workers)
  or a container on a VPS — kept separate from the static site.
