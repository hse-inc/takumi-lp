(() => {
  const TILE_W = 55;
  const TILE_H = 70;
  const SPREAD_MS = 950;
  const START_MS = 150;
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

  const works = document.querySelector('.works');
  if (works) {
    const page = works.closest('.page');
    const btns = [...works.querySelectorAll('.works__btn')];
    const items = [...works.querySelectorAll('.works__item')];
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let now = -1, timer = null, auto = true;
    const set = (n) => {
      now = n;
      works.style.setProperty('--p', btns.length > 1 ? n / (btns.length - 1) : 1);
      btns.forEach((b, i) => { b.classList.toggle('is-now', i === n); b.classList.toggle('is-done', i < n); b.setAttribute('aria-pressed', String(i === n)); });
      items.forEach((el, i) => el.classList.toggle('is-now', i === n));
    };
    const play = () => {
      clearTimeout(timer);
      if (!auto || reduce) return;
      timer = setTimeout(() => { set(now >= btns.length - 1 ? 0 : now + 1); play(); }, now >= btns.length - 1 ? 2600 : 1300);
    };
    btns.forEach((b, i) => b.addEventListener('click', () => { auto = false; clearTimeout(timer); set(i); }));
    document.addEventListener('pagechange', (e) => {
      clearTimeout(timer);
      if (e.detail.page !== page) return;
      auto = true; set(-1);
      timer = setTimeout(() => { set(0); play(); }, 2000);
    });
  }
})();
