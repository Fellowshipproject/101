const links = [...document.querySelectorAll('.album-photo-link')];
const viewer = document.createElement('dialog');

if (links.length && typeof viewer.showModal === 'function') {
  viewer.className = 'photo-viewer';
  viewer.setAttribute('aria-label', 'Album photo viewer');
  viewer.innerHTML = `<div class="viewer-panel">
    <div class="viewer-toolbar">
      <span class="viewer-count" aria-live="polite"></span>
      <button type="button" data-action="close" autofocus>Close <span aria-hidden="true">×</span></button>
    </div>
    <img class="viewer-image" alt="">
    <p class="viewer-caption"></p>
    <div class="viewer-controls">
      <button type="button" data-action="previous">← Previous</button>
      <button type="button" data-action="next">Next →</button>
    </div>
  </div>`;
  document.body.append(viewer);
  const image = viewer.querySelector('.viewer-image');
  const caption = viewer.querySelector('.viewer-caption');
  const count = viewer.querySelector('.viewer-count');
  let current = 0;

  function showPhoto(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    count.textContent = (current + 1) + ' of ' + links.length;
  }

  links.forEach((link, index) => {
    const description = link.querySelector('img').alt;
    link.setAttribute('aria-label', 'View photo ' + (index + 1) + ': ' + description);
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(index);
      viewer.showModal();
    });
  });

  viewer.querySelector('[data-action="close"]').addEventListener('click', () => viewer.close());
  viewer.querySelector('[data-action="previous"]').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('[data-action="next"]').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
}
