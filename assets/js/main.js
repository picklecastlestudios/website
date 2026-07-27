/* Pickle Castle — homepage rendering. No dependencies, no build step. */
(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Wire up Ko-Fi / Discord links everywhere ---------- */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = SITE.links[el.getAttribute("data-link")];
    if (!url || /CHANGE-ME/.test(url)) {
      el.setAttribute("href", "#");
      el.setAttribute("title", "Link not set yet — add it in assets/js/content.js");
      return;
    }
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---------- Games ---------- */
  var grid = document.getElementById("games-grid");
  if (grid) {
    var games = SITE.games || [];
    if (!games.length) {
      document.getElementById("games-empty").hidden = false;
    } else {
      grid.innerHTML = games.map(function (g) {
        var playable = g.status === "playable";
        var isExternal = g.embed && g.embed.type === "external";
        var action;
        if (!playable) {
          action = '<span class="btn btn-sm" aria-disabled="true">Coming soon</span>';
        } else if (isExternal) {
          // App Store / storefront listings link out directly — there's
          // nothing to embed in an iframe for a native app.
          action = g.embed.url
            ? '<a class="btn btn-primary btn-sm" href="' + esc(g.embed.url) + '" target="_blank" rel="noopener">Get it</a>'
            : '<span class="btn btn-sm" aria-disabled="true">Coming soon</span>';
        } else {
          action = '<a class="btn btn-primary btn-sm" href="play.html?game=' + encodeURIComponent(g.slug) + '">Play now</a>';
        }
        var tags = (g.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
        // Price is stated per game, never globally — the site makes no blanket
        // claim about cost. Omit `price` entirely to show nothing.
        var price = g.price
          ? '<span class="game-price">' + esc(g.price) + '</span>'
          : '';
        return '' +
          '<article class="game-card">' +
            '<img class="game-cover" src="' + esc(g.cover) + '" alt="' + esc(g.title) + ' cover art" loading="lazy">' +
            '<div class="game-body">' +
              '<h3 class="game-title">' + esc(g.title) + '</h3>' +
              '<p class="game-tagline">' + esc(g.tagline) + '</p>' +
              (tags ? '<ul class="game-tags">' + tags + '</ul>' : '') +
              '<div class="game-actions">' + action + price + '</div>' +
            '</div>' +
          '</article>';
      }).join("");
    }
  }

  /* ---------- Prototypes ---------- */
  var protoGrid = document.getElementById("prototypes-grid");
  if (protoGrid) {
    var protos = SITE.prototypes || [];
    if (!protos.length) {
      document.getElementById("prototypes-empty").hidden = false;
    } else {
      protoGrid.innerHTML = protos.map(function (p) {
        var tags = (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
        return '' +
          '<article class="game-card prototype-card">' +
            '<div class="cover-wrap">' +
              '<img class="game-cover" src="' + esc(p.cover) + '" alt="' + esc(p.title) + ' prototype cover art" loading="lazy">' +
              '<span class="prototype-badge">Prototype</span>' +
            '</div>' +
            '<div class="game-body">' +
              '<h3 class="game-title">' + esc(p.title) + '</h3>' +
              '<p class="game-tagline">' + esc(p.tagline) + '</p>' +
              (tags ? '<ul class="game-tags">' + tags + '</ul>' : '') +
              (p.playtesterNotes
                ? '<div class="playtester-notes"><p class="playtester-notes-label">Playtester notes</p><p>' + esc(p.playtesterNotes) + '</p></div>'
                : '') +
              '<div class="game-actions">' +
                '<a class="btn btn-primary btn-sm" href="play.html?game=' + encodeURIComponent(p.slug) + '">Play the prototype</a>' +
              '</div>' +
            '</div>' +
          '</article>';
      }).join("");
    }
  }

  /* ---------- News ---------- */
  var list = document.getElementById("news-list");
  if (list) {
    var posts = (SITE.news || []).slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });
    if (!posts.length) {
      document.getElementById("news-empty").hidden = false;
    } else {
      list.innerHTML = posts.map(function (p) {
        var parts = String(p.date).split("-");
        var label = p.date;
        if (parts.length === 3) {
          var d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
          if (!isNaN(d)) {
            label = d.toLocaleDateString("en-US", {
              year: "numeric", month: "short", day: "numeric", timeZone: "UTC"
            });
          }
        }
        return '' +
          '<li class="news-item">' +
            '<div class="news-meta">' +
              '<time class="news-date" datetime="' + esc(p.date) + '">' + esc(label) + '</time>' +
              (p.tag ? '<span class="news-tag">' + esc(p.tag) + '</span>' : '') +
            '</div>' +
            '<div class="news-content">' +
              '<h3>' + esc(p.title) + '</h3>' +
              '<p>' + esc(p.body) + '</p>' +
              (p.url ? '<a class="news-more" href="' + esc(p.url) + '">Read more →</a>' : '') +
            '</div>' +
          '</li>';
      }).join("");
    }
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
