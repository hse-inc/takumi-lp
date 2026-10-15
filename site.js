(() => {
  const TILE_W = 65;
  const TILE_H = 80;
  const SPREAD_MS = 1300;
  const START_MS = 200;
  const FLASH = 0.28;
  document.querySelectorAll('.page--tiles').forEach((page) => {
    const photo = page.querySelector('.ph');
    const box = photo.getBoundingClientRect();
    const cols = Math.max(4, Math.round((box.width || 390) / TILE_W));
    const rows = Math.max(6, Math.round((box.height || 645) / TILE_H));
    const tiles = document.createElement('div');
    tiles.className = 'tiles';
    tiles.setAttribute('aria-hidden', 'true');
    tiles.style.setProperty('--cols', cols);
    tiles.style.setProperty('--rows', rows);
    const n = cols * rows;
    const order = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    order.forEach((rank) => {
      const t = document.createElement('i');
      t.style.setProperty('--d', `${START_MS + Math.round((rank / (n - 1)) * SPREAD_MS)}ms`);
      if (Math.random() < 0.5) t.classList.add('to-left');
      if (Math.random() < FLASH) t.classList.add('is-flash');
      tiles.appendChild(t);
    });
    photo.after(tiles);
  });
  document.querySelectorAll('.page--dawn').forEach((page) => {
    const shade = document.createElement('div');
    shade.className = 'shade';
    shade.setAttribute('aria-hidden', 'true');
    page.querySelector('.ph').after(shade);
  });
})();
