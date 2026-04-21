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
│   ├── .htaccess             # Apache rules for OVH: HTTPS, HSTS, CSP, caching, pretty URLs, 404
│   └── sannvev-logo.png
└── .github/workflows/
    └── deploy-ovh.yml        # optional CI → SFTP to OVH (off until you set secrets)
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

## Deployment — OVHcloud Web Hosting

The site is pure static HTML/CSS/JS under `public/`. The simplest hosting path is OVHcloud Web Hosting (Personal or Professional plan), with DNS delegated to OVH's nameservers or kept on Namecheap with A/AAAA records pointed at the OVH cluster.

### One-time setup

1. **Order OVH Web Hosting** (Personal or Professional tier). OVH assigns you a cluster (e.g. `cluster0XX.hosting.ovh.net`) and SFTP credentials.
2. **Add the domain** in the OVH control panel: Web Cloud → Hosting → Multisite → *Add a domain*. Enter `sannvev.ca`. OVH will issue a TXT challenge to prove ownership if the domain's authoritative DNS is elsewhere.
3. **Configure DNS at Namecheap** (Advanced DNS tab for `sannvev.ca`):

   | Type  | Host | Value                                          | TTL   |
   |-------|------|------------------------------------------------|-------|
   | A     | @    | *OVH cluster IPv4* (from OVH hosting panel)    | 30 min |
   | AAAA  | @    | *OVH cluster IPv6* (from OVH hosting panel)    | 30 min |
   | CNAME | www  | `sannvev.ca.`                                  | 30 min |
   | TXT   | @    | *OVH ownership challenge* (temporary)          | 30 min |

   After OVH validates ownership and SSL issues cleanly, you can remove the TXT challenge and raise TTL to 1 hour.

4. **SSL**: in the OVH hosting panel, enable **Let's Encrypt** for the domain. Issuance typically completes within a few minutes once DNS resolves.
5. **Email** (optional, included with Web Hosting): create `contact@sannvev.ca`. Add OVH's MX + SPF records at Namecheap. Turn on DKIM in the OVH email panel and copy the generated DKIM record into Namecheap.

### Building

```bash
npm ci
SITE_URL=https://sannvev.ca npm run build
```

This produces `public/`. The `static/.htaccess` file is copied in automatically and enforces HTTPS, HSTS, CSP, caching, and pretty URLs.

### Manual deploy (v1, reliable)

Upload the **contents** of `public/` (not the folder itself) to `~/www/` on OVH via SFTP. Any SFTP client works (FileZilla, Cyberduck, `sftp`, `rsync` over SSH if enabled).

Using `rsync` over SSH (preferred if the hosting plan permits SSH):

```bash
rsync -avz --delete ./public/ <user>@<cluster>.hosting.ovh.net:~/www/
```

### Automated deploy (v2, when ready)

`.github/workflows/deploy-ovh.yml` is a GitHub Actions workflow that builds and SFTP-pushes on every push to `main`. To enable:

1. Commit this repo to GitHub (private recommended).
2. Generate a deploy-only SSH keypair. Add the public key to `~/.ssh/authorized_keys` on the OVH account.
3. In the GitHub repo, set these **Actions secrets**:
   - `OVH_SFTP_HOST` — e.g. `ftp.cluster0XX.hosting.ovh.net`
   - `OVH_SFTP_USER` — OVH SFTP username
   - `OVH_SFTP_KEY` — the private key (full content, including `-----BEGIN...-----`)
   - `OVH_REMOTE_PATH` — e.g. `/home/<user>/www`
4. Push to `main`; the workflow runs.

### Verification checklist

After each deploy:

- [ ] `https://sannvev.ca/` and `https://www.sannvev.ca/` both resolve; `www` 301s to apex.
- [ ] HTTP 301s to HTTPS.
- [ ] `curl -I https://sannvev.ca/` shows `strict-transport-security`, `content-security-policy`, `x-content-type-options: nosniff`.
- [ ] `/sitemap-index.xml`, `/robots.txt`, `/404/` all serve correctly.
- [ ] Lighthouse (Chrome DevTools) ≥ 95 for Performance, Accessibility, Best Practices, SEO.

### Rollback

Because every build is deterministic from Git, rollback is `git checkout <prior-sha> && npm run build && rsync …`. For emergency rollback without a rebuild, keep the previous `public/` tarball locally after each deploy.

---

## Notes for content editors

- **Keep copy evergreen.** Avoid dated references (specific grant cycle deadlines, TRL-as-of-a-date) on public pages — the target audience includes grant reviewers who will hold stale facts against you.
- **Directors' bios** in `src/pages/about.mdx` are placeholders (`<!-- TODO -->`). Fill with one-sentence bios when ready.
- **Mailing address** in `src/pages/contact.mdx` is placeholder pending Manitoba Innovates desk/office confirmation.
- **News** is a stub. Don't link it from the header until the first post exists.

## Licensing

Source code in this repository is proprietary to the Sannvev Institute. The Sannvev wordmark and logo are trademarks of the Sannvev Institute and may not be used without permission.
