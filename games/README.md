# Self-hosted games

Only put a build here if **this repo is the one canonical copy** of it. If a
game already deploys from its own repo (its own GitHub Pages, its own domain),
embed that live URL instead — see "Already deployed elsewhere" below. Don't
duplicate a build into both places; the copy here will just go stale the next
time the real one ships.

One folder per game, named with the game's `slug` from `assets/js/content.js`.
Each folder needs an `index.html` at its root — that's what gets loaded in the
play page iframe.

    games/
      pug-panic/
        index.html
        build.js
        assets/...

Then in `assets/js/content.js` set:

    embed: { type: "local", path: "games/pug-panic/" }

Godot, Unity WebGL, Phaser, plain canvas — anything that exports to static web
files works. Keep total build size reasonable; GitHub Pages soft-limits a repo
to about 1 GB and individual files to 100 MB.

For itch.io-hosted games instead, use:

    embed: { type: "itch", id: "1234567" }

The ID is the number in the `<iframe src="https://itch.io/embed-upload/1234567...">`
snippet itch gives you on the game's edit page (requires "embed in frame" enabled).

## Already deployed elsewhere

If the game has its own repo with its own GitHub Pages (or any other live
URL), don't copy the build here — embed the live page directly:

    embed: { type: "iframe", url: "https://picklecastlestudios.github.io/its-repo-name/" }

This is what THE SHATTERED ARCHIVE uses — its canonical build lives in
`github.com/picklecastlestudios/shattered-archive`, and this site just embeds
that deployed page. No file lives in this folder for it.
