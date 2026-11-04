const toggle = document.querySelector('.menu-toggle');
const header = toggle.closest('.site-header');
const mobile = window.matchMedia('(max-width: 800px)');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') === 'false');
});

header.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});

mobile.addEventListener('change', () => setMenu(false));
toggle.hidden = false;
