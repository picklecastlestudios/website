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
     soon" state (if it's here, it's playable), and always carries a
     short ask telling visitors what to try and what feedback we want —
     these are notes FOR playtesters, not notes FROM a playtester.

     Same `embed` shape as games (see above) — these are self-hosted
     ("local") single-file builds under games/<slug>/, since a private
     repo (dungeon-leader) can't have a public GitHub Pages, and a
     prototype snapshot is expected to lag its game repo rather than
     mirror it live like the iframe-embedded finished games do.

     `feedbackPrompt` — a short note addressed TO the person about to play,
     not a report of what we already found. Tell them what's actually in
     this build, what's still missing (so they don't report a known gap
     as a bug), and what kind of feedback would help most. This is an ask
     for playtesters, not playtester notes from us — write it that way.
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
      feedbackPrompt: "This build is just the core loop: carve tiles, paint " +
        "rooms, watch a minion move in. No combat, no scoring, no raids yet " +
        "— that's intentional, not missing. Try digging out a small home and " +
        "tell us: does the carve-and-furnish loop feel good on its own? Does " +
        "the mood dial make sense without any explanation? Does the dark, " +
        "empty opening view feel like a fresh start or just empty? Rough " +
        "edges are expected — let us know what you hit on Discord.",
      // Same facts as feedbackPrompt above, split into a scannable guide for
      // guide.html — kept in sync by hand since it's just a reorganization
      // of what feedbackPrompt already says, not new claims about the build.
      playtestGuide: {
        overview: "This build is the core loop only: carve tiles, paint " +
          "rooms, and watch a minion move in and start living there.",
        tryThis: [
          "Dig out a small home for a minion.",
          "See if the mood dial makes sense without any explanation.",
          "Notice how the dark, empty opening view feels — a fresh start, or just empty?"
        ],
        dontReportThese: [
          "No combat yet.",
          "No scoring yet.",
          "No raids yet.",
          "General rough edges — this is an early snapshot, not a finished build."
        ],
        feedbackAsk: "Does the carve-and-furnish loop feel good on its own? " +
          "Let us know what you hit — and anything else on your mind — on Discord."
      }
    },
    {
      slug: "no-civ-just-deer",
      title: "No Civ, Just Deer",
      tagline: "A cute chibi colony sim about deer who are a little done " +
               "with humans and decide to build their own civilization first.",
      tags: ["Colony sim", "Stealth"],
      cover: "assets/games/no-civ-just-deer-prototype.jpg",
      embed: { type: "local", path: "games/no-civ-just-deer-prototype/" },
      feedbackPrompt: "This build only covers the opening: pick a plot, " +
        "place your Deer Lodge, put up your first building. The core " +
        "gathering loop and ranger encounters aren't wired up yet, so " +
        "don't worry about finding those — instead tell us how the on-ramp " +
        "itself lands: is it clear what to do, does the tone work for you, " +
        "would you want to keep playing? Drop your thoughts on Discord.",
      playtestGuide: {
        overview: "This build covers only the opening: pick a plot, place " +
          "your Deer Lodge, and put up your first building.",
        tryThis: [
          "Pick a plot for your colony.",
          "Place your Deer Lodge.",
          "Put up your first building."
        ],
        dontReportThese: [
          "The core gathering loop isn't wired up yet.",
          "Ranger encounters aren't wired up yet."
        ],
        feedbackAsk: "Is it clear what to do? Does the tone work for you? " +
          "Would you want to keep playing? Drop your thoughts on Discord."
      }
    },
    {
      // Canonical build lives at github.com/picklecastlestudios/troubles-chase,
      // deployed on its own GitHub Pages. Embedded live via iframe, not
      // duplicated into this repo — updates to that repo show up here
      // automatically, no re-sync needed.
      slug: "troubles-chase",
      title: "Troubles Chase",
      tagline: "Your dog stole something she really shouldn't have. Run the " +
               "neighborhood, dodge sprinklers and crate stacks, and get it " +
               "home before Dad catches up.",
      tags: ["Endless runner", "Singleplayer"],
      cover: "assets/games/troubles-chase.jpg",
      embed: { type: "iframe", url: "https://picklecastlestudios.github.io/troubles-chase/" },
      feedbackPrompt: "Troubles is unlocked from the start; the other five " +
        "pets (and the cat) unlock as you rack up distance, so don't worry " +
        "about reaching them in one sitting. Try a few runs and tell us: " +
        "does the difficulty feel fair as the chase speeds up, are the " +
        "obstacles (sprinklers, crate stacks) readable enough to react to, " +
        "and is it clear what's happening when you get caught? Drop your " +
        "thoughts on Discord.",
      playtestGuide: {
        overview: "Troubles is unlocked from the start; the other five " +
          "pets (and the cat) unlock as you rack up distance.",
        tryThis: [
          "Run a few times — don't worry about unlocking every pet in one sitting.",
          "Pay attention to how the difficulty feels as the chase speeds up.",
          "See how readable the obstacles (sprinklers, crate stacks) are.",
          "Notice what happens, and how clear it is, when you get caught."
        ],
        feedbackAsk: "Does the difficulty feel fair as the chase speeds up? " +
          "Are the obstacles readable enough to react to? Is it clear what's " +
          "happening when you get caught? Drop your thoughts on Discord."
      }
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
