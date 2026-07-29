/* Pickle Castle — playtester guide page (guide.html?game=<slug>). No
   dependencies, no build step, mirrors play.js's rendering style. */
(function () {
  "use strict";

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = SITE.links[el.getAttribute("data-link")];
    if (url && !/CHANGE-ME/.test(url)) {
      el.href = url; el.target = "_blank"; el.rel = "noopener";
    }
  });

  var slug = new URLSearchParams(location.search).get("game");
  // Guides only exist for prototypes — finished games don't carry a
  // playtestGuide field, so a stray ?game= for one of those falls through
  // to the "not found" state below same as an unknown slug would.
  var proto = (SITE.prototypes || []).filter(function (p) { return p.slug === slug; })[0];
  var guide = proto && proto.playtestGuide;

  var titleEl = document.getElementById("guide-title");
  var playLink = document.getElementById("guide-play-link");

  if (!proto || !guide) {
    titleEl.textContent = "Guide not found";
    document.getElementById("guide-tagline").textContent =
      "There's no playtester guide for that build yet.";
    playLink.hidden = true;
    document.querySelector(".guide-actions").hidden = true;
    return;
  }

  document.title = proto.title + " — Playtester Guide";
  titleEl.textContent = proto.title + " — Playtester Guide";
  document.getElementById("guide-tagline").textContent = proto.tagline || "";
  playLink.href = "play.html?game=" + encodeURIComponent(proto.slug);

  function fillList(sectionId, listId, items) {
    if (!items || !items.length) return;
    document.getElementById(sectionId).hidden = false;
    document.getElementById(listId).innerHTML =
      items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
  }

  if (guide.overview) {
    document.getElementById("guide-overview-section").hidden = false;
    document.getElementById("guide-overview").textContent = guide.overview;
  }
  fillList("guide-try-section", "guide-try", guide.tryThis);
  fillList("guide-skip-section", "guide-skip", guide.dontReportThese);
  if (guide.feedbackAsk) {
    document.getElementById("guide-ask-section").hidden = false;
    document.getElementById("guide-ask").textContent = guide.feedbackAsk;
  }

  // Plain-text version for the email body / clipboard — built from the same
  // fields as the sections above, so "open as email" and "copy to clipboard"
  // always match what's on the page.
  var lines = [proto.title + " — Playtester Guide", ""];
  if (proto.tagline) lines.push(proto.tagline, "");
  if (guide.overview) lines.push("WHAT'S IN THIS BUILD", guide.overview, "");
  if (guide.tryThis && guide.tryThis.length) {
    lines.push("TRY THIS");
    guide.tryThis.forEach(function (i) { lines.push("- " + i); });
    lines.push("");
  }
  if (guide.dontReportThese && guide.dontReportThese.length) {
    lines.push("NOT A BUG — KNOWN GAPS IN THIS BUILD");
    guide.dontReportThese.forEach(function (i) { lines.push("- " + i); });
    lines.push("");
  }
  if (guide.feedbackAsk) lines.push("WHAT WE'D LOVE TO HEAR", guide.feedbackAsk, "");
  lines.push("Play it: " + location.origin + "/play.html?game=" + encodeURIComponent(proto.slug));
  var text = lines.join("\n");

  // "Open as Email" leaves the To: field blank on purpose — this isn't a
  // report back to the studio (that's the separate bug-report FAB on
  // play.html), it's just handing the tester their own prefilled draft to
  // send to themselves, forward, or leave as notes.
  document.getElementById("guide-email").addEventListener("click", function () {
    var subject = proto.title + " — Playtester Guide";
    location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
  });

  var out = document.getElementById("guide-out");
  var outLabel = document.getElementById("guide-out-label");
  document.getElementById("guide-copy").addEventListener("click", function (e) {
    out.value = text;
    out.hidden = false;
    outLabel.hidden = false;
    var ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        ok = true;
      } else {
        out.focus(); out.select();
        ok = document.execCommand("copy");
      }
    } catch (err) {}
    e.target.textContent = ok ? "✓ Copied" : "Select the text below and copy it";
  });
})();
