(function () {
  "use strict";
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = SITE.links[el.getAttribute("data-link")];
    if (url && !/CHANGE-ME/.test(url)) {
      el.href = url; el.target = "_blank"; el.rel = "noopener";
    }
  });

  var slug = new URLSearchParams(location.search).get("game");
  // Prototypes share this same play page — check games first, then
  // prototypes, so a slug never has to be unique across both lists but
  // an accidental collision still favors the finished game.
  var game = (SITE.games || []).concat(SITE.prototypes || [])
    .filter(function (g) { return g.slug === slug; })[0];
  var mount = document.getElementById("play-mount");

  if (!game) {
    document.getElementById("play-title").textContent = "Game not found";
    mount.innerHTML = '<p class="play-error">That game isn\'t in the castle. ' +
      '<a href="index.html#games" style="color:#F96318">Back to the arcade →</a></p>';
    return;
  }

  document.title = game.title + " — Pickle Castle Game Studios";
  document.getElementById("play-title").textContent = game.title;

  if (game.playtestGuide) {
    var guideLink = document.getElementById("guide-link");
    guideLink.href = "guide.html?game=" + encodeURIComponent(game.slug);
    guideLink.hidden = false;
  }

  if (game.embed.type === "external") {
    // Nothing to embed for a native app / storefront listing — this page
    // shouldn't normally be reached for one (the homepage links out
    // directly instead), but handle it gracefully if it is.
    mount.innerHTML = game.embed.url
      ? '<p class="play-error">This game opens in its own store. ' +
        '<a href="' + game.embed.url.replace(/"/g, "&quot;") + '" style="color:#F96318">Get it →</a></p>'
      : '<p class="play-error">Not out yet — check back soon. ' +
        '<a href="index.html#games" style="color:#F96318">Back to the arcade →</a></p>';
  } else {
    var frame = document.createElement("iframe");
    frame.className = "play-frame";
    frame.title = game.title;
    frame.allow = "autoplay; fullscreen; gamepad";
    frame.setAttribute("allowfullscreen", "");

    if (game.embed.type === "itch") {
      frame.src = "https://itch.io/embed-upload/" + encodeURIComponent(game.embed.id) + "?color=2D5D2E";
    } else if (game.embed.type === "iframe") {
      // Embeds a page that's deployed and hosted elsewhere (its own repo's
      // GitHub Pages, etc.) — the canonical build lives there, not here.
      frame.src = game.embed.url;
    } else {
      frame.src = game.embed.path;
    }
    mount.appendChild(frame);

    // Fullscreen toggle — mobile screens are small, so a small iframe plus
    // browser chrome leaves barely enough room to play. Native Fullscreen
    // API when available (desktop, Android Chrome); CSS-only "fill the
    // viewport" fallback everywhere else (iOS Safari doesn't allow
    // requestFullscreen on arbitrary elements, only <video>).
    var fsBtn = document.getElementById("fs-toggle");
    fsBtn.hidden = false;
    function setFsState(on) {
      mount.classList.toggle("is-fullscreen", on);
      document.body.classList.toggle("is-fs-locked", on);
      fsBtn.setAttribute("aria-pressed", on ? "true" : "false");
      fsBtn.textContent = on ? "✕ Exit fullscreen" : "⛶ Fullscreen";
    }
    fsBtn.addEventListener("click", function () {
      var goingFullscreen = !mount.classList.contains("is-fullscreen");
      setFsState(goingFullscreen);
      var req = mount.requestFullscreen || mount.webkitRequestFullscreen;
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (goingFullscreen && req) {
        req.call(mount).catch(function () {});
      } else if (!goingFullscreen && exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
        exit.call(document);
      }
    });
    ["fullscreenchange", "webkitfullscreenchange"].forEach(function (evt) {
      document.addEventListener(evt, function () {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) setFsState(false);
      });
    });
  }

  // Ko-Fi callout under the game — always shown for a playable game, with
  // the game's own price/support line pulled from content.js so it stays
  // accurate per-game (e.g. "Free — donations welcome" vs a paid title).
  var support = document.getElementById("play-support");
  var note = document.getElementById("play-support-note");
  if (support && game.embed.type !== "external") {
    note.textContent = game.price
      ? "This game is " + game.price.charAt(0).toLowerCase() + game.price.slice(1) + "."
      : "Enjoying this? Consider supporting the studio.";
    support.hidden = false;
  }

  // Bug report / feedback widget — same gating as the Ko-Fi callout above
  // (no point offering it on the "not out yet" / external-store state, since
  // there's no actual playable build on this page to react to). GAME_NAME
  // comes straight from content.js, so nothing here needs per-game editing.
  // Built on the shared game-forge button system (vendored in
  // assets/vendor/game-forge/ — see the README there) instead of a bespoke
  // FAB: fixes a real bug the old inline version had (bare `mailto:` with
  // only a subject, no body — silently no-ops with no mail client configured)
  // by getting the mailto+copy-to-clipboard fallback for free.
  if (game.embed.type !== "external") {
    window.__pcGameTitle = game.title;
  }
})();
