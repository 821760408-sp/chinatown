# my-site

Personal website: portfolio, writing, and small web apps. Built with [Astro](https://astro.build),
deployed to GitHub Pages. See [PLAN.md](PLAN.md) for the roadmap.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Where things go

| What | Where |
|---|---|
| Site name, author, description | `src/lib/site.ts` |
| Blog posts | `src/content/writing/*.md` (or `.mdx`) |
| Portfolio projects | `src/content/projects/*.md` |
| Web apps | `src/pages/apps/<name>.astro`, then list it in `src/pages/apps/index.astro` |
| Images, files, favicon | `public/` |
| Global styles | `src/styles/global.css` |

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it
to GitHub Pages. Pull requests build but don't deploy. The workflow sets the site URL and base
path automatically, so a custom domain needs no code changes.
