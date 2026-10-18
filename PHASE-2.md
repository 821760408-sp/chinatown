# Phase 2 — Web 1.0 redesign & the 2026 Music Retro

Part of [PLAN.md](PLAN.md). This phase restyles the site as a personal homepage from
around 1999–2002. It turns the home page into a front door that links to separate
**regions** (sub-projects). The first region is a **2026 music retrospective**.

> **To confirm:** the brief said "1999–2022". This plan assumes **1999–2002**, the
> GeoCities / Angelfire / early-blog years. If you really meant up to 2022, the
> look would be different, so tell me before Step 1.

---

## 1. Design direction: "personal homepage, ca. 2000"

The goal is a site that feels hand-made in Notepad, while still being built properly
underneath: fast, accessible, readable on a phone.

### Visual vocabulary
| Element | Treatment |
|---|---|
| Page | Centred fixed-width column (~760px, the old 800×600 target) on a tiled or flat background. Shrinks to fit narrow screens. |
| Type | System fonts of the era: **Verdana / Tahoma** for interface text, **Times New Roman / Georgia** for long writing, **Courier New** for small details. No web fonts in v1. |
| Links | Classic blue `#0000EE`, visited purple `#551A8B`, always underlined. |
| Boxes | Table-style panels with 1–2px borders, grey title bars, 3D bevels (`outset` / `inset` borders) for buttons. Built with CSS grid, not real layout tables. |
| Colour | Each region gets its own palette and background tile, like separate sites in a webring. The front door is the most neutral. |
| Decorations | 88×31 badges, a "last updated" stamp, `<hr>` dividers, a sitemap link, "best viewed at 800×600" in the footer, a few small GIFs. |
| Motion | A `<marquee>`-style ticker and blinking "NEW!" labels, made with CSS animation. Both **switch off under `prefers-reduced-motion`**. |
| Hit counter | A visit counter in the classic style. v1 is static/decorative. A real count can come from GoatCounter in Phase 3. |
| Guestbook | Optional and later (Phase 4). It needs a backend, so it is not in this phase. |

### What we are deliberately *not* copying
- Real layout `<table>`s, `<frame>`s, `<font>` tags. Screen readers and phones still need to work.
- Low-contrast text on busy backgrounds: tiles stay subtle behind text panels.
- Autoplaying MIDI or audio.
- Dark mode (dropped from the old Phase 2 list; it isn't true to the era).
- Scraped GIFs of unclear origin. Decorations are made by us, or come from openly
  licensed sets with credit given.

### Design tokens (starting point, tuned once we see it)
```css
--page-width: 760px;
--link: #0000ee;  --link-visited: #551a8b;  --link-active: #ee0000;
--panel-bg: #ffffff;  --panel-border: #000000;  --titlebar: #c0c0c0;
--bevel-light: #ffffff;  --bevel-dark: #808080;
--font-ui: Verdana, Tahoma, Geneva, sans-serif;
--font-text: "Times New Roman", Times, Georgia, serif;
--font-mono: "Courier New", Courier, monospace;
```

---

## 2. Site structure: the front door and regions

```
/                       Front door: welcome, region directory, what's new, counter
/music-2026/            Region 1: 2026 Music Retro   ← first build
/work/                  Region: portfolio (current /projects/, restyled)
/writing/               Region: essays & notes (current /writing/, restyled)
/lab/                   Region: small web apps (current /apps/, restyled)
/sitemap/               A plain list of every page, in the old style
```

- **Front door (`/`)**: short welcome text, then a **region directory**: one panel
  per region with a small icon or 88×31 button, a one-line description, and a status
  label (`NEW!`, `under construction`, `updated 12/2026`). Below that, a "What's
  new" log and the footer (counter, badges, last updated, email).
- **Regions are data-driven**. One list in `src/data/regions.ts` (slug, title, blurb,
  icon, status, colours) feeds both the front door and the sitemap. Adding a region
  means adding a folder in `src/pages/` plus one entry in that list.
- **Each region has its own look** through a `RegionLayout` that takes the region's
  colours and background tile. Shared items (back to front door, footer) stay the same,
  so it still feels like one site.
- **Renaming URLs**: `/projects/` → `/work/` and `/apps/` → `/lab/`. The site
  went live today, so no redirects are needed.

---

## 3. Region 1: 2026 Music Retro (`/music-2026/`)

A year-end listening journal: one long page you scroll, the way early blogs and
year-end lists worked, with a contents list at the top.

### Page layout
1. **Header**: title art or styled heading ("2026 :: a year in listening"), the date
   it was written, and a short intro essay.
2. **Contents**: numbered list of entries, each linking to its spot further down the
   page (`#entry-slug`).
3. **Entries**, in order. Each one is a panel with:
   - number/rank (or just an order, if you'd rather not rank)
   - title, artist, kind (album / EP / single / track), release date
   - cover image (see licensing note below)
   - **your writing**: as long or short as each needs
   - optional "start with" track and a pull-quote line
   - **listening buttons**: `[Bandcamp] [Spotify] [Apple Music] [YouTube]` as
     beveled 88×31-style buttons. Only the ones you fill in appear.
4. **Outro**: closing essay, plus links to a full-year playlist on each service.
5. Back-to-top links between entries, a footer link back to the front door.

### No embedded players by default
Spotify, Apple Music and YouTube embeds each load third-party scripts and trackers
on page load and are slow. Plain link buttons fit the era and keep the page light.
*Optional:* a "▶ listen here" button that loads a **Bandcamp** embed only after a
click (Bandcamp pays artists most directly).

### Content model
Each entry is a Markdown file in `src/content/music-2026/`. The frontmatter holds the
facts and links; the body is your writing.

```yaml
---
title: "Album Title"
artist: "Artist Name"
kind: album            # album | ep | single | track
released: 2026-03-14
order: 1               # position on the page
cover: ./covers/album-title.jpg   # optional
startWith: "Track Name"           # optional
links:
  bandcamp: https://artist.bandcamp.com/album/...
  spotify: https://open.spotify.com/album/...
  appleMusic: https://music.apple.com/...
  youtube: https://www.youtube.com/...
---

Your contemplative writing goes here, in Markdown.
```

Intro and outro essays: `src/content/music-2026/_intro.md` and `_outro.md`
(or written straight into the page; to decide in Step 4).

### Cover art
Small album covers are widely used in reviews and year-end lists, but they are
copyrighted. Options: (a) small covers at thumbnail size, credited, the common
practice; (b) no covers, with a typographic panel per entry, which is very 2000;
(c) covers for Bandcamp releases only, from the artist's own page. **Recommendation:
(a), with (b) as the fallback for any entry without a cover.**

---

## 4. Build steps

| Step | What | Done when |
|---|---|---|
| 1 | **Design system**: new global CSS + tokens, base layout, panel / titlebar / bevel button / badge / ticker / counter / "NEW!" components | A test page shows every component; works at 375px wide and with reduced motion |
| 2 | **Regions + front door**: `regions.ts`, `RegionLayout`, new `/`, `/sitemap/`; move Work/Writing/Apps to `/work/`, `/writing/`, `/lab/` in the new style | Front door lists every region; all old content reachable |
| 3 | **Music Retro skeleton**: `music-2026` collection + schema, page with header / contents / entries / outro, listening buttons, 2–3 placeholder entries | Page builds from Markdown; buttons only show for filled-in links |
| 4 | **Your content**: you write the intro, entries and outro; I wire in links and covers | Real entries replace placeholders |
| 5 | **Decorations & polish**: 88×31 badges, background tiles, favicon, 404 in the same style, "What's new" log | Front door feels finished |
| 6 | **QA**: phone layout, keyboard navigation, contrast, reduced motion, Lighthouse, link check | No accessibility errors; all listening links resolve |

Steps 1–3 are mine and can go in one pass. Step 4 is yours, and can start in parallel
as plain Markdown, even before the page exists.

---

## 5. What I need from you

- [ ] Confirm the era: **1999–2002** (assumed) or something else?
- [ ] URL slug for the retro: `/music-2026/` (assumed), `/2026/`, `/retro-2026/`, …
- [ ] Ranked list, or just an order?
- [ ] Your list of releases: title + artist is enough to start. I can find the links.
- [ ] Cover art choice: (a), (b) or (c) above.
- [ ] Any reference sites or screenshots you love (old GeoCities pages, Space Jam '96,
      a specific blog). The [GeoCities Gallery](https://geocities.restorativland.org/)
      and [neocities.org](https://neocities.org/browse) are good places to look.
- [ ] Should Work / Writing / Lab stay as regions on the front door now, or be hidden
      until they have real content?
