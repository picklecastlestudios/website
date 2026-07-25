/* ============================================================
   PICKLE CASTLE — SITE CONTENT
   This is the only file you edit to add a game or a news post.
   No build step, no CMS. Save, commit, push. Done.
   ============================================================ */

const SITE = {
  /* -------- Put your real links here -------- */
  links: {
    kofi:    "https://ko-fi.com/picklecastlestudios",
    discord: "https://discord.gg/nGeZY26FEE"
  },

  /* ============================================================
     GAMES
     Two ways to host a game — pick per game:

     1) SELF-HOSTED  →  put the build in  games/<slug>/  (needs an index.html)
        embed: { type: "local", path: "games/pug-panic/" }

     2) ITCH.IO      →  copy the numeric ID out of your itch embed code
        embed: { type: "itch", id: "1234567" }

     3) EXTERNAL STORE (App Store, Steam, Google Play, itch page you don't
        want embedded, etc.) → the card's button links out instead of
        embedding an iframe. Leave url: "" until the listing exists — the
        button then shows "Coming soon" even if status is "playable".
        embed: { type: "external", url: "https://apps.apple.com/..." }

     Set  status: "playable" | "soon"  ("soon" hides the Play button).

     Set  price:  a per-game string shown on the card — "Free", "$4.99",
     "Free demo". Leave it "" to show nothing. The site deliberately makes
     NO global claim about price, so each game states its own terms and
     nothing needs rewriting when you start charging.

     Cover images go in  assets/games/  — 16:9 works best (e.g. 960x540).
     ============================================================ */
  games: [
    /* -----------------------------------------------------------------
       ⚠ status / price / embed below are best guesses — NOT confirmed.
       Both default to status:"soon" (hides the Play button) and no price
       so nothing overclaims. Update once real details are set. See the
       chat for what's still unconfirmed.
       ----------------------------------------------------------------- */
    {
      // ⚠ PLAYABLE, but embed.path below is a placeholder — see chat.
      // Waiting on where the actual build lives before this can go live.
      slug: "shattered-archive",
      title: "THE SHATTERED ARCHIVE",
      tagline: "A game that teaches you how to use Claude. Not associated " +
               "with or sponsored by Anthropic.",
      tags: ["Learning", "Singleplayer"],
      cover: "assets/games/placeholder.svg",
      status: "playable",
      price: "Free — donations welcome",            // no charge; Ko-Fi carries the ask
      embed: { type: "local", path: "games/shattered-archive/" }
    },
    {
      slug: "no-civ-just-deer",
      title: "No Civ, Just Deer",
      tagline: "A cute chibi colony sim about deer who are a little done " +
               "with humans and decide to build their own civilization first.",
      tags: ["Colony sim", "iOS — coming soon"],
      cover: "assets/games/placeholder.svg",
      status: "soon",
      price: "~$4 (planned)",                       // not final — App Store pricing TBD
      embed: { type: "external", url: "" }           // fill in once it's on the App Store
    }
  ],

  /* ============================================================
     NEWS  —  newest first. date must be YYYY-MM-DD.
     `url` is optional: link to a full post, an itch page, wherever.
     ============================================================ */
  news: [
    {
      date: "2026-07-25",
      tag: "Studio",
      title: "The castle has a website",
      body: "Pickle Castle Game Studios now has a home. Games, devlogs and " +
            "release notes will land here.",
      url: ""
    }
  ]
};
