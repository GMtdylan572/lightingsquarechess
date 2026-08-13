# Handoff — Lightning Square Chess

Two jobs remain: **(1) make the current site HTTPS**, and **(2) get the new
Astro site live**. Everything below is verified, not assumed.

---

## Where things stand

| Thing | State |
|---|---|
| Live site | `lightningsquarechess.org`, **HTTP only** — port 443 dead, no certificate exists |
| Host | InfinityFree, account `if0_34689247`, login `xddbeauty@gmail.com` |
| Registrar | Namecheap. Nameservers point to `ns1–ns5.byet.org` (InfinityFree) |
| Live site files | Repo root `*.html` — edited via InfinityFree **File Manager**, no git connection |
| New site | `site/` — Astro 7 + React 19 + Tailwind 4 + shadcn/ui, 18 pages, builds clean |
| Pushed to | branch `claude/domain-migration-com-793b4a` on `GMtdylan572/lightingsquarechess` |
| `redesign/` folder | Superseded intermediate, uncommitted. Safe to delete |
| Analytics | **None, ever.** No traffic data exists for any period |

Note the repo name is misspelled (`lighting`, no `n`). The domain is spelled
correctly. Don't "fix" one to match the other by accident.

Two domains sit on the hosting account:
- `lightningsquarechess.org` — the real one, live
- `lightingsquarechess.org` — typo, does not resolve, ignore it

---

## Job 1 — HTTPS on the current site

The cause is not DNS and not Namecheap. DNS resolves fine to `185.27.134.226`.
**There is simply no certificate**: a TLS handshake on port 443 gets nothing.
Browsers can only reach it over plain HTTP, hence "Not secure".

The certificate has to be issued by **InfinityFree**, the host. Namecheap
cannot help.

### Steps

1. `dash.infinityfree.com` → **SSL Certificates** in the top nav
2. Request a certificate for **`lightningsquarechess.org`** and
   **`www.lightningsquarechess.org`**
3. Validation should be automatic because the nameservers already point at
   InfinityFree. Issuance takes minutes to a few hours
4. When issued, install it from that same page (it may also need pasting into
   cPanel → SSL/TLS)
5. Then force HTTPS by adding this to the **top** of `.htaccess` in `htdocs`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

The existing `.htaccess` already has a `RewriteEngine On` and rules that
redirect `/` to `home-20260725.html`. Put the HTTPS block **before** those.

6. Verify: `https://lightningsquarechess.org` should load with a padlock, and
   `http://` should redirect to it.

### Caching gotcha

InfinityFree serves stale HTML even though `.htaccess` sends `no-cache`, and
even in incognito. A change that looks like it "didn't work" may just be
cached. **Always verify with a cache-buster:**

```
http://lightningsquarechess.org/about.html?cachebust=12345
```

This already bit us once — an edit that appeared to have failed had actually
saved correctly.

---

## Job 2 — Getting the new site live

`site/` is an Astro project. It **must be built**; you cannot upload the source.

```bash
cd site
npm install
npm run build      # outputs site/dist/
```

`site/dist/` is plain static HTML/CSS/JS and can be hosted anywhere.

### Option A — Cloudflare Pages (recommended)

Fixes HTTPS, deployment and the FTP workflow in one move, and is free.

1. **The user must create the Cloudflare account** — Claude cannot create
   accounts or enter passwords
2. Cloudflare Pages → Connect to Git → pick `GMtdylan572/lightingsquarechess`
3. Build command `npm run build`, output directory `dist`, root directory `site`
4. Point the domain at it from Namecheap
5. HTTPS is automatic and auto-renews

This also makes every future edit a `git push` instead of a manual upload.

### Option B — Stay on InfinityFree

Run `npm run build` locally, then upload the **contents of `site/dist/`** into
`htdocs` via File Manager or FTP, overwriting the old site. Must be repeated
after every change, and Job 1 still has to be done separately.

### Before going live either way

- Set `site: 'https://...'` in `site/astro.config.mjs` to the real final domain
  (currently `https://lightningsquarechess.com`, which is **not yet owned** —
  see below). It drives the sitemap and canonical URLs.
- Decide the `.org` vs `.com` question. As of the last check the `.com` was
  sitting in a Namecheap cart at $11.28/yr but **was not confirmed purchased**.
  Verify before relying on it. If `.com` is bought, 301-redirect `.org` to it.

---

## Open items in the new site

Tracked in `site/README.md` under "Still to do":

1. **Analytics** — marked comment in `site/src/layouts/Base.astro`. Nothing has
   ever been measured, so there is no baseline
2. **Registration links** for the four 2026 quads — all say "registration soon"
   because that is what the old site said. Add Google Form URLs to
   `upcomingQuads` in `site/src/data/site.ts`
3. **Oct/Nov 2024 crosstables** point at the same US Chess link. One is likely
   wrong. Flagged with a comment in `site/src/data/site.ts`
4. **Photos are rotting.** Eight ImgBB images were already dead 404s on the live
   site; they were swapped for surviving photos from the same schools. All 38
   currently resolve, but they are all on a free third-party host. Move them
   into `site/public/` and commit them
5. `nca.html` and `community.html` from the old site were not carried over.
   Decide if they are wanted as archive pages

---

## Content drift to reconcile

`about.html` was edited **directly on the server** and **locally on `main`**,
while the Astro version lives on a branch. Serena Yuan is now:

> **Vice President**, WCM Serena Yuan, **Menlo School**

That is correct and live in the old site. It is **half-applied** in the Astro
version: `site/src/data/site.ts` has the Vice President title and the reorder,
but still says **The Harker School**. Fix that line.

Also on the old site, `about.html` line ~108 reads "Head of Coach", which is
awkward English. The Astro version says "Head of Coaching".

---

## Things Claude cannot do here

Worth knowing up front so the next session doesn't waste turns:

- **Create accounts** (Cloudflare, or any other) or **enter passwords**
- **Log into InfinityFree** — the Chrome extension session was not authenticated
  and the login page cannot be filled in by Claude
- **Upload via FTP** — no credentials

Claude *can* drive the browser once the user is already logged in, and can read,
edit, build and push code.
