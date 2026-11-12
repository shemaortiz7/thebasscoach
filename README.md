# The Bass Coach website

The public website for The Bass Coach: https://thebasscoachonline.com

It is a plain static site. There is no build step, no database, no login and
no third-party scripts. What you see in this folder is exactly what is served.

## How it is hosted

- **GitHub Pages** serves the files from the `main` branch of this repository.
- **Cloudflare** holds the domain and its DNS records, which point at GitHub Pages.
- HTTPS is enforced by GitHub Pages.

Any change committed to `main` goes live a minute or two later.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The home page. All the wording lives here. |
| `privacy.html` | The privacy page. |
| `404.html` | Shown when a page is not found. |
| `styles.css` | All the styling. Brand colours are at the top. |
| `main.js` | The playable strings on the home page. Nothing else. |
| `*.woff2` | The two fonts, served from this site (SIL Open Font Licence). |
| `favicon.svg`, `apple-touch-icon.png`, `og-image.png` | Icons and the link-preview image. |
| `CNAME` | Tells GitHub Pages which domain to use. Do not delete. |
| `robots.txt`, `sitemap.xml` | For search engines. |

## Editing the wording

Open `index.html` on GitHub, click the pencil icon, change the text between the
tags, and commit. Leave the tags themselves alone.

## Security notes

- Each page carries a Content-Security-Policy that only allows files from this
  site. If you add an outside service (a sign-up form, a video embed), the
  policy in the `<head>` of that page has to be updated to allow it.
- The site sets no cookies and collects no personal data. If that changes,
  update `privacy.html` first.
- Keep two-factor authentication switched on for the GitHub and Cloudflare
  accounts. Those two logins are the only way into this site.

## Fonts

Big Shoulders Display and Instrument Sans, both under the SIL Open Font
Licence 1.1.
