(() => {
  const COLS = 5;
  const ROWS = 8;
  const SPREAD_MS = 900;
  const START_MS = 150;
  document.querySelectorAll('.page--tiles').forEach((page) => {
    const tiles = document.createElement('div');
    tiles.className = 'tiles';
    tiles.setAttribute('aria-hidden', 'true');
    const order = [...Array(COLS * ROWS).keys()].sort(() => Math.random() - 0.5);
    order.forEach((rank) => {
      const t = document.createElement('i');
      t.style.setProperty('--d', `${START_MS + Math.round((rank / (COLS * ROWS - 1)) * SPREAD_MS)}ms`);
      tiles.appendChild(t);
    });
    const photo = page.querySelector('.ph');
    photo.after(tiles);
  });
})();
