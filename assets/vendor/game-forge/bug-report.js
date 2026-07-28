// Structured bug-report / feedback capture — builds a context object (game,
// page, timestamp, device, viewport) plus the player's own text into a report,
// then offers it back via a prefilled mailto AND copy-to-clipboard (never a
// bare `mailto:` with no body — that silently no-ops on any machine with no
// mail client configured). Depends on modal.js for the popup shell and
// buttons.css for its button styling (load both alongside this module).
//
// Usage (bare form, one report type):
//   import { openReportModal } from './bug-report.js';
//   openReportModal({
//     gameName: 'My Game',
//     mailto: 'studio@example.com',
//     title: 'Report a Bug',
//     fields: [
//       { id: 'what', label: 'What went wrong?', type: 'textarea' },
//       { id: 'severity', label: 'Severity', type: 'select', options: ['Minor', 'Major', 'Game-breaking'] },
//     ],
//     // optional — the "attach diagnostic state" extension: return anything
//     // JSON-serializable (save snapshot, error-log tail, current scene) and
//     // it gets appended to the report body under a DIAGNOSTICS section.
//     diagnostics: () => ({ save: mySave.loadState(), errors: myErrorLog.getLog().slice(-10) }),
//   });
//
// Usage (the common case — a floating button offering BOTH bug report and
// feedback forms, matching the studio website's pattern):
//   import { createBugFeedbackFab } from './bug-report.js';
//   document.body.append(createBugFeedbackFab({ gameName: 'My Game', mailto: 'studio@example.com' }));

import { openModal, closeModal } from './modal.js';
import { createFabMenu } from './buttons.js';

function esc(s) {
  return String(s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}
function fieldHtml(f) {
  const label = `<label class="rpt-fld-label">${esc(f.label)}</label>`;
  if (f.type === 'select') {
    return label + `<select class="rpt-fld" id="${f.id}">${(f.options || []).map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  }
  return label + `<textarea class="rpt-fld" id="${f.id}" placeholder="${esc(f.placeholder || '')}"></textarea>`;
}
function fieldVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

export function buildContext(gameName, extra = {}) {
  return {
    game: gameName,
    url: typeof location !== 'undefined' ? location.href : '',
    time: new Date().toString(),
    device: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    viewport: typeof innerWidth !== 'undefined' ? `${innerWidth}x${innerHeight}` : '',
    ...extra,
  };
}

function copyOrPrompt(text, outEl, btnEl) {
  let ok = false;
  try { outEl.focus(); outEl.select(); } catch (e) {}
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text); ok = true; }
    else ok = document.execCommand('copy');
  } catch (e) {}
  if (btnEl) btnEl.textContent = ok ? '✓ Copied' : 'Select the text above and copy it';
}

// Final "here's your report" screen — mailto (prefilled body) + copy fallback.
// The copy fallback prepends the destination address to what's shown/copied
// (but NOT to the mailto body — the mail client already fills in "To:") so a
// player pasting this into Discord/Notes/wherever still knows where it goes.
export function showReport({ title = 'Report ready', text, subject, mailto }) {
  const copyText = mailto ? `To: ${mailto}\n\n${text}` : text;
  openModal(
    `<h3>${esc(title)}</h3>
     <p class="rpt-sub">Send it (opens your mail app) or copy it if that doesn't work.</p>
     <textarea class="rpt-fld rpt-out" id="rptOut" readonly>${esc(copyText)}</textarea>
     <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">
       <button class="pc-btn pc-btn--primary" data-a="email">Send Email</button>
       <button class="pc-btn pc-btn--secondary" data-a="copy">Copy to Clipboard</button>
       <button class="pc-btn pc-btn--ghost" data-a="close">Done</button>
     </div>`,
    (action) => {
      if (action === 'close') return closeModal();
      if (action === 'email') {
        location.href = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        const btn = document.querySelector('[data-a="email"]');
        if (btn) btn.textContent = '✓ Opening your mail app…';
      }
      if (action === 'copy') {
        const out = document.getElementById('rptOut');
        const btn = document.querySelector('[data-a="copy"]');
        copyOrPrompt(copyText, out, btn);
      }
    }
  );
}

// Entry-point form — free-text/select fields, builds the report text on submit,
// then hands off to showReport(). fields drive both the form and the body text.
export function openReportModal({ gameName, mailto, title = 'Report a Bug', subjectPrefix = 'Bug Report', fields = [], diagnostics, contextExtra }) {
  openModal(
    `<h3>${esc(title)}</h3>
     <p class="rpt-sub">What happened in ${esc(gameName)}? This builds a report you can send or copy.</p>
     ${fields.map(fieldHtml).join('')}
     <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">
       <button class="pc-btn pc-btn--primary" data-a="submit">Create report</button>
       <button class="pc-btn pc-btn--ghost" data-a="close">Cancel</button>
     </div>`,
    (action) => {
      if (action === 'close') return closeModal();
      if (action === 'submit') {
        const c = buildContext(gameName, contextExtra);
        let text = `=== ${c.game} — ${title.toUpperCase()} ===\n` +
          `Page: ${c.url}\nTime: ${c.time}\nDevice: ${c.device}   ·   viewport ${c.viewport}\n\n` +
          fields.map((f) => `${f.label.toUpperCase()}:\n${fieldVal(f.id) || '(blank)'}\n`).join('\n');
        if (diagnostics) {
          try { text += `\n--- DIAGNOSTICS ---\n${JSON.stringify(diagnostics())}\n`; }
          catch (e) { /* diagnostics collection is best-effort, never blocks the report */ }
        }
        showReport({ title: `${title} ready`, text, subject: `[${c.game}] ${subjectPrefix}`, mailto });
      }
    }
  );
}

// The common case: one floating button offering BOTH a bug-report form
// (with a severity field) and a feedback form (with category/priority) —
// the exact two-variant split the studio website already ships by hand.
// Returns the element from buttons.js's createFabMenu(); append it once.
export function createBugFeedbackFab({ gameName, mailto, diagnostics, contextExtra } = {}) {
  return createFabMenu({
    icon: '🐛',
    ariaLabel: 'Report a bug or give feedback',
    items: [
      {
        label: 'Report a Bug',
        onClick: () => openReportModal({
          gameName, mailto, diagnostics, contextExtra,
          title: 'Report a Bug',
          subjectPrefix: 'Bug Report',
          fields: [
            { id: 'what', label: 'What went wrong?', type: 'textarea' },
            { id: 'steps', label: 'What were you doing when it happened?', type: 'textarea' },
            { id: 'severity', label: 'Severity', type: 'select', options: ['Minor', 'Annoying', 'Major', 'Game-breaking'] },
          ],
        }),
      },
      {
        label: 'Give Feedback',
        onClick: () => openReportModal({
          gameName, mailto, diagnostics, contextExtra,
          title: 'Give Feedback',
          subjectPrefix: 'Feedback',
          fields: [
            { id: 'idea', label: 'Your idea or feedback', type: 'textarea' },
            { id: 'category', label: 'Category', type: 'select', options: ['Feature idea', 'Balance / difficulty', 'Art / visuals', 'UI / controls', 'Other'] },
            { id: 'priority', label: 'How important is it to you?', type: 'select', options: ['Nice to have', 'Would really like it', 'Important'] },
          ],
        }),
      },
    ],
  });
}

if (typeof window !== 'undefined') {
  window.BugReportKit = { buildContext, showReport, openReportModal, createBugFeedbackFab };
}
