/* Opeyemi Phone & Gadgets — catalog, hub actions, forms (zero dependencies) */
(() => {
  'use strict';

  const WA_NUMBER = '2349030393902';
  const PHONE_DISPLAY = '09030393902';
  const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const ngn = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

  /* ---------------- catalog data ---------------- */
  const PRODUCTS = [
    { name:'iPhone 8 Plus', storage:'64GB', series:'8',  price:165000,  was:195000,  grade:'Grade B', battery:86, tag:'In Stock', h:222 },
    { name:'iPhone X',      storage:'64GB', series:'x',  price:215000,  was:249000,  grade:'Grade A', battery:88, tag:'In Stock', h:230 },
    { name:'iPhone XR',     storage:'64GB', series:'x',  price:245000,  was:279000,  grade:'Grade A', battery:90, tag:'In Stock', h:210 },
    { name:'iPhone 11',     storage:'64GB', series:'11', price:315000,  was:359000,  grade:'Grade A', battery:89, tag:'Hot',      h:236 },
    { name:'iPhone 11',     storage:'128GB',series:'11', price:355000,  was:399000,  grade:'Grade A', battery:92, tag:'In Stock', h:244 },
    { name:'iPhone 11 Pro', storage:'256GB',series:'11', price:430000,  was:489000,  grade:'Grade A', battery:88, tag:'Few Left', h:252 },
    { name:'iPhone 12',     storage:'128GB',series:'12', price:415000,  was:469000,  grade:'Grade A', battery:91, tag:'Hot',      h:218 },
    { name:'iPhone 12 Pro', storage:'256GB',series:'12', price:545000,  was:609000,  grade:'Grade A', battery:90, tag:'In Stock', h:226 },
    { name:'iPhone 13',     storage:'128GB',series:'13', price:525000,  was:579000,  grade:'Grade A', battery:93, tag:'In Stock', h:240 },
    { name:'iPhone 13',     storage:'256GB',series:'13', price:585000,  was:645000,  grade:'Grade A', battery:94, tag:'In Stock', h:248 },
    { name:'iPhone 13 Pro', storage:'256GB',series:'13', price:695000,  was:769000,  grade:'Grade A', battery:92, tag:'Few Left', h:256 },
    { name:'iPhone 14',     storage:'128GB',series:'14', price:725000,  was:799000,  grade:'Grade A', battery:95, tag:'Hot',      h:214 },
    { name:'iPhone 14 Pro', storage:'256GB',series:'14', price:925000,  was:1015000, grade:'Grade A', battery:94, tag:'In Stock', h:232 },
    { name:'iPhone 15',     storage:'128GB',series:'15', price:955000,  was:1049000, grade:'Grade A', battery:97, tag:'In Stock', h:242 },
    { name:'iPhone 15 Pro', storage:'256GB',series:'15', price:1185000, was:1290000, grade:'Grade A', battery:96, tag:'Few Left', h:250 },
    { name:'iPhone 16',     storage:'128GB',series:'16', price:1255000, was:1350000, grade:'New',     battery:100,tag:'In Stock', h:34  },
    { name:'iPhone 16 Pro', storage:'256GB',series:'16', price:1485000, was:1590000, grade:'New',     battery:100,tag:'In Stock', h:42  },
  ];

  const PHONE_SVG = `
    <svg class="p-phone" viewBox="0 0 120 240" aria-hidden="true">
      <rect x="7" y="7" width="106" height="226" rx="24" fill="rgba(4,10,36,.55)"
            stroke="currentColor" stroke-width="4"/>
      <rect x="17" y="30" width="86" height="180" rx="12" fill="currentColor" opacity=".14"/>
      <rect x="45" y="15" width="30" height="7" rx="3.5" fill="currentColor" opacity=".8"/>
      <circle cx="60" cy="222" r="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".7"/>
    </svg>`;

  const tagClass = (t) => t === 'Hot' ? 't-hot' : t === 'Few Left' ? 't-few' : 't-stock';

  const cardHTML = (p, i) => {
    const isNew = p.grade === 'New';
    const badge = isNew ? 'Brand New' : `UK Used · ${p.grade.replace('Grade ', '')}`;
    const save = p.was ? p.was - p.price : 0;
    const msg =
      `Hello Opeyemi Phone & Gadgets 👋, I'd like to ORDER the ${p.name} ${p.storage} ` +
      `(${badge}, ${ngn(p.price)}) from your website. Is it still available?`;
    return `
      <article class="p-card" style="--h:${p.h};animation-delay:${Math.min(i, 8) * 45}ms">
        <div class="p-media">
          <span class="p-tag ${tagClass(p.tag)}">${p.tag}</span>
          ${p.was ? `<span class="p-was">Was ${ngn(p.was)}</span>` : ''}
          ${PHONE_SVG}
        </div>
        <div class="p-body">
          <div class="p-top">
            <h3 class="p-name">${p.name}</h3>
            <span class="p-badge${isNew ? ' is-new' : ''}">${badge}</span>
          </div>
          <p class="p-spec"><b>${p.storage}</b> · Battery health <b>${p.battery}%</b> · Tested &amp; working</p>
          <div class="p-price">
            <span class="now">${ngn(p.price)}</span>
            ${p.was ? `<span class="was">${ngn(p.was)}</span>` : ''}
            ${save ? `<span class="save">Save ${ngn(save)}</span>` : ''}
          </div>
          <a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2zm4.6 12.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1 2.8.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.3-.4z" fill="currentColor"/></svg>
            Order via WhatsApp
          </a>
        </div>
      </article>`;
  };

  /* ---------------- shops (grid + filter chips) ---------------- */
  document.querySelectorAll('[data-shop]').forEach((shop) => {
    const grid = shop.querySelector('[data-grid]');
    const empty = shop.querySelector('[data-empty]');
    const meta = shop.querySelector('[data-count-label]');
    let filter = 'all';

    const render = () => {
      const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.series === filter);
      grid.innerHTML = list.map(cardHTML).join('');
      empty.hidden = list.length > 0;
      meta.textContent = `Showing ${list.length} of ${PRODUCTS.length} units in stock`;
    };

    shop.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        shop.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        filter = chip.dataset.filter;
        render();
      });
    });

    render();
  });

  /* ---------------- modal system ---------------- */
  let lastFocus = null;

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('locked');
    const focusable = modal.querySelector('select, button, a[href], input, textarea');
    if (focusable) setTimeout(() => focusable.focus({ preventScroll: true }), 60);
  };

  const closeModal = (modal) => {
    modal.hidden = true;
    if (!document.querySelector('.modal:not([hidden])')) document.body.classList.remove('locked');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  document.querySelectorAll('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(modal); });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('.modal:not([hidden])');
    if (open) closeModal(open);
  });

  /* ---------------- trade-in valuation (sell) ---------------- */
  const TRADE = {
    'iPhone 16 Pro Max':1150000,'iPhone 16 Pro':980000,'iPhone 16':820000,
    'iPhone 15 Pro Max':1000000,'iPhone 15 Pro':855000,'iPhone 15':700000,
    'iPhone 14 Pro Max':800000,'iPhone 14 Pro':705000,'iPhone 14':560000,
    'iPhone 13 Pro Max':655000,'iPhone 13 Pro':545000,'iPhone 13':405000,
    'iPhone 12 Pro':425000,'iPhone 12':325000,
    'iPhone 11 Pro':335000,'iPhone 11':245000,
    'iPhone XR':175000,'iPhone X':155000,'iPhone 8 Plus':115000,
    'Samsung Galaxy S24':640000,'Samsung Galaxy S23':480000,'Samsung Galaxy A55':265000,
    'Tecno Camon 30':185000,'Infinix Note 40':155000,'Other phone':0,
  };
  const STORAGE_MULT = { '64':1, '128':1.06, '256':1.14, '512':1.25 };
  const COND_MULT = { flawless:1, clean:.9, worn:.76, faulty:.45 };
  const BATT_MULT = { '95':1, '90':.97, '85':.93, '80':.88 };

  const fillSelect = (sel, keys) => {
    sel.innerHTML = keys.map((k) => `<option value="${k}">${k}</option>`).join('');
  };
  const modelKeys = Object.keys(TRADE);

  const sellForm = document.getElementById('sell-form');
  const sellModel = document.getElementById('sell-model');
  const estValue = document.getElementById('est-value');
  const estRange = document.getElementById('est-range');
  fillSelect(sellModel, modelKeys);
  sellModel.value = 'iPhone 13';

  const round5k = (n) => Math.max(5000, Math.round(n / 5000) * 5000);

  const calcEstimate = () => {
    const base = TRADE[sellModel.value] || 0;
    if (!base) return { mid: 0, low: 0, high: 0 };
    const storage = document.getElementById('sell-storage').value;
    const batt = document.getElementById('sell-battery').value;
    const cond = sellForm.querySelector('input[name="condition"]:checked').value;
    const mid = round5k(base * STORAGE_MULT[storage] * COND_MULT[cond] * BATT_MULT[batt]);
    return { mid, low: round5k(mid * .95), high: round5k(mid * 1.05) };
  };

  const updateEstimate = () => {
    const { mid, low, high } = calcEstimate();
    estValue.textContent = mid ? ngn(mid) : 'Call us';
    estRange.textContent = mid
      ? `Likely range: ${ngn(low)} – ${ngn(high)} · confirmed after inspection`
      : 'Select your exact model for an estimate, or call 09030393902';
  };

  sellForm.addEventListener('input', updateEstimate);
  updateEstimate();

  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const condLabel = sellForm.querySelector('input[name="condition"]:checked').closest('label').querySelector('span').textContent;
    const { mid, low, high } = calcEstimate();
    const msg =
      `Hello Opeyemi Phone & Gadgets 👋\n\n` +
      `I want to SELL my phone:\n` +
      `• Model: ${sellModel.value}\n` +
      `• Storage: ${document.getElementById('sell-storage').value}GB\n` +
      `• Battery: ${document.getElementById('sell-battery').value}%+\n` +
      `• Condition: ${condLabel}\n` +
      `• Website estimate: ${mid ? `${ngn(low)} – ${ngn(high)}` : 'to be discussed'}\n\n` +
      `Please give me your final offer.`;
    window.open(wa(msg), '_blank', 'noopener');
  });

  /* ---------------- swap inquiry ---------------- */
  const swapForm = document.getElementById('swap-form');
  const swapHave = document.getElementById('swap-have');
  const swapWant = document.getElementById('swap-want');
  fillSelect(swapHave, modelKeys);
  swapHave.value = 'iPhone 11';
  fillSelect(swapWant, PRODUCTS.map((p) => `${p.name} ${p.storage}`).filter((v, i, a) => a.indexOf(v) === i));
  swapWant.value = swapWant.options[Math.min(8, swapWant.options.length - 1)].value;

  swapForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg =
      `Hello Opeyemi Phone & Gadgets 👋\n\n` +
      `I want to SWAP my phone:\n` +
      `• I have: ${swapHave.value} (${document.getElementById('swap-storage').value}, ` +
      `${document.getElementById('swap-cond').value})\n` +
      `• I want: ${swapWant.value}\n` +
      (document.getElementById('swap-note').value.trim() ? `• Note: ${document.getElementById('swap-note').value.trim()}\n` : '') +
      `\nPlease check the value and tell me the top-up (or cash back).`;
    window.open(wa(msg), '_blank', 'noopener');
  });

  /* ---------------- static WhatsApp links ---------------- */
  const welcome =
    `Hello Opeyemi Phone & Gadgets 👋 I saw your website and I'd like to ask about your phones.`;
  ['hero-wa', 'cta-wa', 'bar-wa', 'foot-wa'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = wa(welcome);
  });

  /* ---------------- header + reveal + counters ---------------- */
  const header = document.querySelector('.site-header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      }, { threshold: .12, rootMargin: '0px 0px -40px' })
    : null;
  document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '+';
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: .5 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
