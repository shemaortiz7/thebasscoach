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
| `main.js` | The video pause button and the playable strings. Nothing else. |
| `archivo.woff2` | The font (Archivo, SIL Open Font Licence), served from this site. |
| `logo.png` | The Bass Coach logo, transparent background. |
| `hero-loop.mp4`, `hero-poster.jpg` | The silent 8-second loop at the top of the home page, and its still. |
| `lesson.webp`, `lesson-880.webp` | The lesson frame in "What a lesson looks like" (two sizes). |
| `pluck.webp`, `fret.webp` | The two hand close-ups. |
| `chriss.webp`, `chriss-480.webp` | Chriss's photo in the coaches section (two sizes). |
| `favicon.png`, `apple-touch-icon.png`, `og-image.jpg` | Icons and the link-preview image. |
| `CNAME` | Tells GitHub Pages which domain to use. Do not delete. |
| `robots.txt`, `sitemap.xml` | For search engines. |

All video and photos come from The Bass Coach's own lesson footage.

## Editing the wording

Open `index.html` on GitHub, click the pencil icon, change the text between the
tags, and commit. Leave the tags themselves alone.

## Swapping a photo or the video

Upload a new file with exactly the same name and it replaces the old one.
Keep the same proportions so the layout does not shift.

## Security notes

- Each page carries a Content-Security-Policy that only allows files from this
  site. If you add an outside service (a sign-up form, a YouTube embed), the
  policy in the `<head>` of that page has to be updated to allow it.
- The site sets no cookies and collects no personal data. If that changes,
  update `privacy.html` first.
- Keep two-factor authentication switched on for the GitHub and Cloudflare
  accounts. Those two logins are the only way into this site.
