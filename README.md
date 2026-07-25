# Pickle Castle Game Studios — website

Static site for **picklecastlestudios.com**. Plain HTML/CSS/JS, no build step,
no dependencies. Served by GitHub Pages straight off `main`.

## Adding things

Everything content-related lives in **one file**: `assets/js/content.js`.

**Your links** (do this first):

```js
links: {
  kofi:    "https://ko-fi.com/yourname",
  discord: "https://discord.gg/yourinvite"
}
```

Until those are set, the Ko-Fi and Discord buttons render but go nowhere.

**A new game** — add an object to `games`:

```js
{
  slug: "pug-panic",                          // url-safe id, must be unique
  title: "Pug Panic",
  tagline: "Defend the castle. The pug is not helping.",
  tags: ["Arcade", "Singleplayer"],
  cover: "assets/games/pug-panic.png",        // 16:9, ~960x540
  status: "playable",                         // "playable" | "soon"
  embed: { type: "local", path: "games/pug-panic/" }
  // or:  { type: "itch",  id: "1234567" }
}
```

See `games/README.md` for how self-hosted builds and itch embeds differ.

**A news post** — add to `news` (newest first, date is `YYYY-MM-DD`):

```js
{ date: "2026-08-01", tag: "Patch", title: "v0.2", body: "…", url: "" }
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly via `file://` mostly works, but self-hosted game
iframes won't — use the server.

## Deploying

Push to `main`. GitHub Pages redeploys in ~1 minute.

One-time setup in the repo: **Settings → Pages → Source: Deploy from a branch →
`main` / `/ (root)`**, then set the custom domain to `picklecastlestudios.com`
and tick **Enforce HTTPS** once the certificate provisions.

### GoDaddy DNS

In GoDaddy → your domain → DNS → Records:

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | @ | 185.199.108.153 | GitHub Pages |
| A | @ | 185.199.109.153 | |
| A | @ | 185.199.110.153 | |
| A | @ | 185.199.111.153 | |
| CNAME | www | picklecastlestudios.github.io | trailing dot if required |

Delete any GoDaddy parking/forwarding records for `@` and `www` first, or they
will fight the above. Propagation is usually minutes but can take a few hours;
the HTTPS certificate only provisions after DNS resolves correctly.

The `CNAME` file in this repo must stay — it's what tells Pages the custom
domain. `.nojekyll` stops GitHub from running Jekyll over the files.

## Files

```
index.html              landing page
play.html               generic game player (?game=<slug>)
404.html
CNAME                   custom domain for GitHub Pages
assets/css/style.css    all styling
assets/js/content.js    ← the file you edit
assets/js/main.js       renders cards from content.js
assets/brand/           logo, emblems, brand sheet
assets/games/           cover art
games/<slug>/           self-hosted game builds
```

## Brand

Colors sampled from the logo artwork:

| | Hex |
|---|---|
| Castle green | `#2D5D2E` |
| Deep green | `#1B3A1C` |
| Flag orange | `#F96318` |
| Cream | `#FDF2E2` |
| Ink | `#262926` |

Type: Fredoka (display), Nunito (body), Press Start 2P (pixel accents).
