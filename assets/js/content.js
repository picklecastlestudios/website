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
        Use this only when this repo is the ONE canonical copy of the build.
        If the game already deploys from its own repo (its own GitHub Pages,
        itself), use type "iframe" below instead — don't duplicate the build
        here, or the copy on this site goes stale the next time it ships.

     2) ITCH.IO      →  copy the numeric ID out of your itch embed code
        embed: { type: "itch", id: "1234567" }

     3) IFRAME (a page that's already deployed elsewhere — its own repo's
        GitHub Pages, its own domain, etc.) → embeds that live URL directly,
        so this site always shows whatever's currently live there.
        embed: { type: "iframe", url: "https://picklecastlestudios.github.io/shattered-archive/" }

     4) EXTERNAL STORE (App Store, Steam, Google Play, itch page you don't
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
      // Canonical build lives at github.com/picklecastlestudios/shattered-archive,
      // deployed on its own GitHub Pages. Embedded live via iframe, not
      // duplicated into this repo — updates to that repo show up here
      // automatically, no re-sync needed.
      slug: "shattered-archive",
      title: "THE SHATTERED ARCHIVE",
      tagline: "A game that teaches you how to use Claude. Not associated " +
               "with or sponsored by Anthropic.",
      tags: ["Learning", "Singleplayer"],
      cover: "assets/games/shattered-archive.jpg",
      status: "playable",
      price: "Free — donations welcome",            // no charge; Ko-Fi carries the ask
      embed: { type: "iframe", url: "https://picklecastlestudios.github.io/shattered-archive/" }
    },
    /* No Civ, Just Deer moved to the Prototypes section below (2026-07-26)
       — it's still an early build, not a finished/priced game yet. See
       the `prototypes` array. Its old cover, assets/games/no-civ-just-deer.jpg,
       is unused for now (kept in case it returns here once it ships). */
  ],

  /* ============================================================
     PROTOTYPES  —  early, playable builds that aren't finished games
     yet. Kept separate from `games` on purpose: no price, no "coming
     soon" state (if it's here, it's playable), and always carries real
     playtester notes so visitors know exactly how early this is.

     Same `embed` shape as games (see above) — these are self-hosted
     ("local") single-file builds under games/<slug>/, since a private
     repo (dungeon-leader) can't have a public GitHub Pages, and a
     prototype snapshot is expected to lag its game repo rather than
     mirror it live like the iframe-embedded finished games do.

     `playtesterNotes` — a few honest sentences, written after actually
     playing the build. Say what worked, say what didn't, say what
     wasn't tested. Never polish this into ad copy.
     ============================================================ */
  prototypes: [
    {
      slug: "dungeon-leader",
      title: "Dungeon Leader",
      tagline: "Carve a monster's dungeon out of the mountain, paint rooms, " +
               "furnish them, and watch your minions actually live there. " +
               "Raids and growth are a later layer — right now it's just the toy.",
      tags: ["3D", "Dungeon builder"],
      cover: "assets/games/dungeon-leader.jpg",
      embed: { type: "local", path: "games/dungeon-leader/" },
      playtesterNotes: "We gave this a real playtest before posting it. " +
        "Carving out rooms, painting them by type, and watching a minion " +
        "actually wander around and use the space is already satisfying " +
        "with zero combat or scoring — which was the whole test for this " +
        "stage. Rough edges: the opening view is dark and empty until " +
        "you've carved a few tiles (no zoom yet), and it's not always " +
        "obvious what's nudging the mood dial. No raids, multiple floors, " +
        "or saving yet — that's next."
    },
    {
      slug: "no-civ-just-deer",
      title: "No Civ, Just Deer",
      tagline: "A cute chibi colony sim about deer who are a little done " +
               "with humans and decide to build their own civilization first.",
      tags: ["Colony sim", "Stealth"],
      cover: "assets/games/no-civ-just-deer-prototype.jpg",
      embed: { type: "local", path: "games/no-civ-just-deer-prototype/" },
      playtesterNotes: "We played through the opening of this one too. " +
        "Picking a plot, placing the Deer Lodge, and putting up a " +
        "Woodcutter's Hut all felt confident and full of personality, " +
        "right down to the flavor text. We didn't get to the core " +
        "resource-gathering drag-and-drop or the ranger encounters this " +
        "round, so treat this as a first look at the on-ramp rather than " +
        "the whole game."
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
