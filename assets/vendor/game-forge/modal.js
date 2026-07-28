// Generic modal/panel helper — renders an HTML string into an overlay and wires
// every element tagged data-a="name" to a callback keyed by that action name.
// Escape and backdrop-click both close; focus returns to whatever was focused
// before the modal opened; the first field/button inside gets autofocus.
//
// Usage:
//   import { openModal, closeModal } from './modal.js';
//   openModal(
//     '<h3>Title</h3><button data-a="ok">OK</button><button data-a="close">Cancel</button>',
//     (action) => { if (action === 'ok') { /* ... */ } closeModal(); }
//   );
//
// Style hooks (bring your own CSS): .modal-overlay (the fixed backdrop) and
// .modal-box (the panel itself, passed opts.overlayClass/opts.boxClass to rename).

let lastFocused = null;
let overlayEl = null;

function onKeydown(e) {
  if (e.key === 'Escape') closeModal();
}

export function closeModal() {
  if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  document.removeEventListener('keydown', onKeydown);
  if (lastFocused && lastFocused.focus) lastFocused.focus();
  lastFocused = null;
}

export function openModal(html, onAction, opts = {}) {
  closeModal();
  lastFocused = document.activeElement;

  const overlay = document.createElement('div');
  overlay.className = opts.overlayClass || 'modal-overlay';
  overlay.innerHTML = `<div class="${opts.boxClass || 'modal-box'}" role="dialog" aria-modal="true">${html}</div>`;
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) closeModal(); });

  document.body.appendChild(overlay);
  document.addEventListener('keydown', onKeydown);

  overlay.querySelectorAll('[data-a]').forEach((el) => {
    el.addEventListener('click', () => onAction(el.dataset.a, el));
  });

  const firstField = overlay.querySelector('textarea, select, input, button');
  if (firstField) firstField.focus();

  overlayEl = overlay;
  return overlay;
}

if (typeof window !== 'undefined') {
  window.ModalKit = { openModal, closeModal };
}
