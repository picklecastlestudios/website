# Self-hosted games

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
