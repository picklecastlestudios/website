// DOM helper for buttons.css — composes the markup (icon + label) and keeps
// disabled state semantically real (not just visual) whether the element is
// a <button> or an <a> standing in for one.
// Usage:
//   import { createButton, setButtonDisabled } from './buttons.js';
//   const playBtn = createButton({ label: 'Play', variant: 'primary', onClick: startGame });
//   document.body.append(playBtn);
//   const muteBtn = createButton({ label: '♪', variant: 'ghost', size: 'icon', ariaLabel: 'Mute' });
//   setButtonDisabled(playBtn, true); // greys out + blocks the click handler, works on <a> too
//   Also exports createFabMenu() — a floating icon button that expands into a
//   stack of labeled actions (see its own usage comment below).

function esc(s) {
  return String(s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

// createButton({ label, variant, size, icon, ariaLabel, tag, href, onClick, disabled })
// variant: 'primary' | 'secondary' | 'ghost' | 'danger' (default: base .pc-btn styling)
// size: 'sm' | 'icon' (default: normal)
// icon: an SVG/HTML string rendered before the label, wrapped in .pc-btn__icon
// tag: 'button' (default) or 'a' — use 'a' + href for navigation, not onClick-as-navigation
export function createButton({ label = '', variant, size, icon, ariaLabel, tag = 'button', href, onClick, disabled = false } = {}) {
  const el = document.createElement(tag);
  el.className = ['pc-btn', variant && `pc-btn--${variant}`, size && `pc-btn--${size}`].filter(Boolean).join(' ');
  if (tag === 'button') el.type = 'button';
  if (tag === 'a' && href) el.href = href;
  if (ariaLabel) el.setAttribute('aria-label', ariaLabel);

  el.innerHTML = (icon ? `<span class="pc-btn__icon" aria-hidden="true">${icon}</span>` : '') + (label ? esc(label) : '');

  if (onClick) {
    el._pcOnClick = onClick;
    el.addEventListener('click', (e) => {
      if (el.disabled || el.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
      onClick(e);
    });
  }

  setButtonDisabled(el, disabled);
  return el;
}

// Keeps [disabled]/aria-disabled and the visual state in sync for both real
// <button> elements and stand-in <a>/<div> elements (which have no native
// disabled attribute, hence aria-disabled + the pointer-events:none in CSS
// + the click-handler guard above as a third belt-and-suspenders layer).
export function setButtonDisabled(el, disabled) {
  if ('disabled' in el) el.disabled = !!disabled;
  el.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  if (disabled && document.activeElement === el) el.blur();
}

// createFabMenu({ icon, ariaLabel, items: [{ label, onClick }] })
// A pc-btn--icon trigger (bottom-right, fixed) that expands into a stack of
// labeled pc-btn pills. Closes on outside click, Escape, or picking an item.
// Usage:
//   import { createFabMenu } from './buttons.js';
//   document.body.append(createFabMenu({
//     icon: '🐛', ariaLabel: 'Report a bug or give feedback',
//     items: [{ label: 'Report a Bug', onClick: openBugForm }, { label: 'Give Feedback', onClick: openFeedbackForm }],
//   }));
export function createFabMenu({ icon = '☰', ariaLabel = 'More actions', items = [] } = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'pc-fab-wrap';

  const menu = document.createElement('div');
  menu.className = 'pc-fab-menu';

  const trigger = createButton({ label: icon, variant: 'primary', size: 'icon', ariaLabel });
  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');

  function close() {
    menu.classList.remove('pc-fab-menu--open');
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onOutsideClick, true);
    document.removeEventListener('keydown', onKeydown);
  }
  function open() {
    menu.classList.add('pc-fab-menu--open');
    trigger.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', onOutsideClick, true);
    document.addEventListener('keydown', onKeydown);
  }
  function onOutsideClick(e) { if (!wrap.contains(e.target)) close(); }
  function onKeydown(e) { if (e.key === 'Escape') close(); }

  trigger.addEventListener('click', () => {
    if (menu.classList.contains('pc-fab-menu--open')) close(); else open();
  });

  items.forEach(({ label, onClick }) => {
    const item = createButton({ label, variant: 'secondary', onClick: () => { close(); onClick(); } });
    menu.append(item);
  });

  wrap.append(menu, trigger);
  return wrap;
}

if (typeof window !== 'undefined') {
  window.ButtonKit = { createButton, setButtonDisabled, createFabMenu };
}
