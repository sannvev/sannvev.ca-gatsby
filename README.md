# Sannvev Institute — website

Static Gatsby 5 + TypeScript + MDX site for the Sannvev Institute, designed to deploy to OVHcloud Web Hosting with DNS on Namecheap.

Audience: investors, government officials, grant reviewers, academic partners.

---

## Local development

Requires Node 20+ (see `.nvmrc`). From this directory:

```bash
npm install
npm run develop       # http://localhost:8000
npm run build         # outputs ./public/
npm run serve         # serve ./public/ at http://localhost:9000
npm run typecheck     # tsc --noEmit
```

MDX content lives in `src/pages/*.mdx`. Each page imports `Layout` and exports a `Head` component for per-page `<title>` / meta.

## Project layout

```
sannvev.ca-gatsby/
├── gatsby-config.ts          # plugins, siteMetadata (incl. siteUrl env override)
├── gatsby-browser.tsx        # global CSS + @fontsource imports
├── gatsby-ssr.tsx            # same, for SSR
├── src/
│   ├── components/           # Layout, Header, Footer, SEO, PageHeading, CardRow, OrgJsonLd
│   ├── pages/                # index.mdx, about.mdx, research.mdx, engagement.mdx, contact.mdx, news.mdx, 404.mdx
│   ├── styles/               # tokens.css (palette/type vars), base.css
│   └── images/               # sannvev-logo.png, sannvev-mark.png
├── static/
│   ├── CNAME                 # custom domain for GitHub Pages (sannvev.ca)
│   └── sannvev-logo.png
└── .github/workflows/
    └── gatsby.yml            # build + publish to GitHub Pages on push to main
```

## Style tokens

Palette + typography in `src/styles/tokens.css`:

- `--forest` `#2E6B40` — primary green (wordmark colour)
- `--sage` `#7AA082` — secondary green
- `--bone` `#E8E4D6` — warm off-white
- `--ink` `#0B0B0B` / `--slate` `#3A3F3B` — type colours
- Headings: **Fraunces** (serif). Body: **Inter** (sans). Self-hosted via `@fontsource/*`.

## Content editing

Non-devs can edit copy directly in `src/pages/*.mdx`. Frontmatter (`title`, `description`) is used by the `Head` helper. Changes need a rebuild (`npm run build`) before redeployment.

---

## Deployment — GitHub Pages

Every push to `main` triggers [`.github/workflows/gatsby.yml`](.github/workflows/gatsby.yml), which runs `npm run build` and publishes `public/` to the `github-pages` environment. GitHub Pages then serves the site at `https://sannvev.ca` (custom domain declared in [`static/CNAME`](static/CNAME), which Gatsby copies to the site root at build time). The workflow uses `configure-pages` with `static_site_generator: gatsby`, which auto-injects a `pathPrefix` when the site is served under the fallback `sannvev.github.io/sannvev.ca-gatsby/` URL and drops it once the custom domain is active.

### One-time setup

1. **Enable Pages in the repo** — *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
2. **Configure DNS at Namecheap** (Advanced DNS tab for `sannvev.ca`):

   | Type  | Host | Value                 | TTL    |
   |-------|------|-----------------------|--------|
   | A     | @    | `185.199.108.153`     | 30 min |
   | A     | @    | `185.199.109.153`     | 30 min |
   | A     | @    | `185.199.110.153`     | 30 min |
   | A     | @    | `185.199.111.153`     | 30 min |
   | AAAA  | @    | `2606:50c0:8000::153` | 30 min |
   | AAAA  | @    | `2606:50c0:8001::153` | 30 min |
   | AAAA  | @    | `2606:50c0:8002::153` | 30 min |
   | AAAA  | @    | `2606:50c0:8003::153` | 30 min |
   | CNAME | www  | `sannvev.github.io.`  | 30 min |

   Remove any pre-existing `URL redirect`, `Parking`, or default Namecheap records for `@` and `www` first — they will conflict with GitHub Pages.

3. **Verify the domain in GitHub** — *Settings → Pages → Custom domain:* enter `sannvev.ca`, save. Pages will confirm DNS and provision a Let's Encrypt certificate automatically (usually within minutes, occasionally up to an hour). Also enable *Settings → Pages → Enforce HTTPS* once the certificate is issued.
4. **(Optional) Verify domain ownership for the org** — *Settings → Pages → Verified domains* on the `sannvev` org adds a `_github-pages-challenge` TXT record at Namecheap. This prevents domain takeover by other GitHub users and is recommended once the initial cutover is stable.

### Building locally

```bash
npm ci
SITE_URL=https://sannvev.ca npm run build
```

This produces `public/`. The deploy workflow runs the same command on every push.

### Verification checklist

After each deploy:

- [ ] The Actions run on `main` is green.
- [ ] `https://sannvev.ca/` serves the latest build; `https://www.sannvev.ca/` redirects to apex.
- [ ] HTTP 301s to HTTPS (GitHub Pages handles this once *Enforce HTTPS* is on).
- [ ] `/sitemap-index.xml`, `/robots.txt`, `/404/` all serve correctly.
- [ ] Lighthouse (Chrome DevTools) ≥ 95 for Performance, Accessibility, Best Practices, SEO.

### Rollback

Every build is deterministic from Git, so rollback = `git revert <sha>` + push. The workflow redeploys the previous content.

### Notes & limitations of GitHub Pages

- **No custom response headers.** HSTS, CSP, and similar must be set via `<meta>` tags if at all (weaker than real headers). Acceptable here because the site serves static informational content and does not accept user input.
- **Email is on ProtonMail**, not GitHub — `contact@sannvev.ca` is handled by ProtonMail's MX records at Namecheap, independently of the Pages DNS above. Don't let the Pages DNS setup overwrite the ProtonMail MX/TXT records.
- **Build minutes** on GitHub Pages are generous for public repos; for private repos, check the Actions billing page.

---

## Notes for content editors

- **Keep copy evergreen.** Avoid dated references (specific grant cycle deadlines, TRL-as-of-a-date) on public pages — the target audience includes grant reviewers who will hold stale facts against you.
- **Directors' bios** in `src/pages/about.mdx` are placeholders (`{/* TODO */}`). Fill with one-sentence bios when ready.
- **Mailing address** in `src/pages/contact.mdx` is placeholder pending Manitoba Innovates desk/office confirmation.
- **News** is a stub. Don't link it from the header until the first post exists.

## Licensing

Source code in this repository is proprietary to the Sannvev Institute. The Sannvev wordmark and logo are trademarks of the Sannvev Institute and may not be used without permission.
