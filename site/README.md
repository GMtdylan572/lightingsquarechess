# Lightning Square Chess — website

Astro + React (islands only) + Tailwind v4 + shadcn/ui. Builds to plain static
HTML, so it can be hosted anywhere: Cloudflare Pages, Netlify, or uploaded to
InfinityFree by hand.

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>.

```bash
npm run build     # writes dist/
npm run preview   # serve dist/ locally to check the real build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/site.ts` | **Every fact about the club.** Dates, venues, coaches, results links, FAQ, quotes, staff. Edit here first. |
| `src/pages/` | One file per URL. `schools/[slug].astro` generates all five school pages from the data file. |
| `src/layouts/Base.astro` | `<head>`, nav, footer, structured data, theme script. |
| `src/components/` | Shared pieces. `ui/` is shadcn; the rest is ours. |
| `src/styles/global.css` | Design tokens: colours, fonts, radius, light and dark themes. |

### Adding a page

Create `src/pages/thing.astro`, then add it to `nav` in `src/data/site.ts`. It
appears in the desktop menu, the mobile drawer and the footer automatically.

### Adding a tournament result

Add one line to `pastQuads` in `src/data/site.ts`. It shows up in the archive
table and the count updates itself.

## About the JavaScript

Astro ships zero JS by default. React is loaded on exactly two pages, where
the interactivity is real:

| Page | Island | Why |
| --- | --- | --- |
| `/tournaments` | `ResultsArchive.tsx` | Filter and sort 24 crosstables |
| `/quads/faq` | `FaqAccordion.tsx` | shadcn Accordion |

Every other page ships **0 KB of JavaScript**. The mobile drawer is a native
`<dialog>` and the theme toggle is nine lines of vanilla script, both
deliberately: an earlier version used the shadcn `<Sheet>` for the menu and
that pulled 210 KB of React onto all eighteen pages to do nothing but slide a
panel in.

Keep it that way. Before adding `client:load` to something, check whether a
`<details>`, a `<dialog>` or a CSS `:has()` would do it.

## Design notes

The palette is tournament-board green and buff on warm paper. Numerals are set
in IBM Plex Mono with tabular figures, because most of this site is records:
dates, ratings, time controls, scores. Headings are Fraunces, used sparingly.
Corner radius is small on purpose.

The checkerboard texture (`.board-texture`) belongs **only on solid dark
panels**. Over a photograph it reads as a transparency grid, which is a mistake
worth not repeating.

## Deploying

The build output in `dist/` is static files.

- **Cloudflare Pages / Netlify** — connect the repo, build command `npm run
  build`, output directory `dist`. Gives free HTTPS and deploys on push.
- **InfinityFree** — run `npm run build` locally, then upload the contents of
  `dist/` over FTP. Remember to build before every upload.

Update `site:` in `astro.config.mjs` when the real domain is live; it drives
the sitemap and canonical URLs.

### Traffic analytics

The shared layout includes Cloudflare Web Analytics on every page. Set
`PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` in the build environment to the site token
shown under **Cloudflare Dashboard → Web Analytics → Manage site**. The beacon
is omitted from local and production builds when the variable is unset.

## Still to do

1. **Registration links for the 2026 quads.** All four say "registration soon"
   because that is what the old site said. Add the Google Form URLs to
   `upcomingQuads` in `src/data/site.ts`.
2. **Check the October / November 2024 crosstables.** Both rows point at the
   same US Chess link (`202410276222-31521472`). One is probably wrong. Marked
   with a comment in `src/data/site.ts`.
3. **Get the photos off ImgBB.** Eight images were already dead 404s on the
   live site when this was built; they have been swapped for surviving photos
   from the same schools. Everything is still on a free third-party host and
   will keep rotting. Move them into `public/` and commit them.
4. **2027 Championship.** `championship.astro` shows a "concluded" banner
   automatically once the date in `src/data/site.ts` is in the past.
