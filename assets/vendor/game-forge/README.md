# Vendored from game-forge assets

The files in this folder are copied verbatim from the studio's shared
snippet library at `game-forge assets/snippets/` (outside this repo) — see
`game-forge assets/MECHANICS_LIBRARY.md` for what each one does and why.

**Do not hand-edit these files here.** If a fix or change is needed, make it
in the source of truth (`game-forge assets/snippets/`) and re-copy — this
folder should always match the canonical version exactly, per the hosting
rule in `MECHANICS_LIBRARY.md`: snippets are vendored into each consuming
repo, never cross-origin-loaded from elsewhere, so each repo (including this
one) keeps its own local copy.

Last synced: 2026-07-27, from `game-forge assets/snippets/` as of the
bug-report.js `createBugFeedbackFab()` addition.

Files: `buttons.css`, `buttons.js`, `modal.js`, `bug-report.js`, `themes.css`.
