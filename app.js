/* Opeyemi Phone & Gadgets — catalog, hub actions, forms (zero dependencies) */
(() => {
  'use strict';

  const WA_NUMBER = '2349030393902';
  const PHONE_DISPLAY = '09030393902'; // kept for reference / future use
  void PHONE_DISPLAY;
  const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const ngn = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

  /* ---------------- catalog data ----------------
     Models & NGN prices reflect the Nigerian UK-used
     market as at October 2026 (dealer benchmark data).
     h = hue for card background — matches finish family. */
  const PRODUCTS = [
    { name:'iPhone 8 Plus',   storage:'64GB',  series:'8',  price:125000,  was:149000,  grade:'Grade B', battery:85, tag:'In Stock', finish:'Gold',          h:42  },
    { name:'iPhone X',        storage:'64GB',  series:'x',  price:175000,  was:199000,  grade:'Grade A', battery:87, tag:'In Stock', finish:'Space Grey',    h:220 },
    { name:'iPhone XR',       storage:'64GB',  series:'x',  price:235000,  was:265000,  grade:'Grade A', battery:89, tag:'In Stock', finish:'White',         h:210 },
    { name:'iPhone 11',       storage:'64GB',  series:'11', price:260000,  was:289000,  grade:'Grade A', battery:88, tag:'Hot',      finish:'Green',         h:150 },
    { name:'iPhone 11',       storage:'128GB', series:'11', price:300000,  was:335000,  grade:'Grade A', battery:90, tag:'In Stock', finish:'Green',         h:150 },
    { name:'iPhone 11 Pro',   storage:'256GB', series:'11', price:390000,  was:429000,  grade:'Grade A', battery:87, tag:'Few Left', finish:'Midnight Green',h:160 },
    { name:'iPhone 12',       storage:'128GB', series:'12', price:335000,  was:369000,  grade:'Grade A', battery:90, tag:'Hot',      finish:'Blue',          h:214 },
    { name:'iPhone 12 Pro',   storage:'256GB', series:'12', price:440000,  was:485000,  grade:'Grade A', battery:89, tag:'In Stock', finish:'Space Grey',    h:222 },
    { name:'iPhone 13',       storage:'128GB', series:'13', price:425000,  was:469000,  grade:'Grade A', battery:92, tag:'Hot',      finish:'Blue',          h:218 },
    { name:'iPhone 13',       storage:'256GB', series:'13', price:465000,  was:515000,  grade:'Grade A', battery:93, tag:'In Stock', finish:'Blue',          h:218 },
    { name:'iPhone 13 Pro',   storage:'256GB', series:'13', price:635000,  was:699000,  grade:'Grade A', battery:91, tag:'Few Left', finish:'Sierra Blue',   h:198 },
    { name:'iPhone 13 Pro Max',storage:'256GB',series:'13', price:735000,  was:799000,  grade:'Grade A', battery:92, tag:'In Stock', finish:'Sierra Blue',   h:198 },
    { name:'iPhone 14',       storage:'128GB', series:'14', price:495000,  was:545000,  grade:'Grade A', battery:94, tag:'Hot',      finish:'Purple',        h:285 },
    { name:'iPhone 14 Pro',   storage:'256GB', series:'14', price:740000,  was:815000,  grade:'Grade A', battery:93, tag:'In Stock', finish:'Gold',          h:45  },
    { name:'iPhone 14 Pro Max',storage:'256GB',series:'14', price:915000,  was:999000,  grade:'Grade A', battery:93, tag:'In Stock', finish:'Gold',          h:45  },
    { name:'iPhone 15',       storage:'128GB', series:'15', price:705000,  was:769000,  grade:'Grade A', battery:96, tag:'Hot',      finish:'Blue',          h:202 },
    { name:'iPhone 15 Pro',   storage:'256GB', series:'15', price:895000,  was:969000,  grade:'Grade A', battery:95, tag:'Few Left', finish:'Blue Titanium', h:215 },
    { name:'iPhone 15 Pro Max',storage:'256GB',series:'15', price:1060000, was:1149000, grade:'Grade A', battery:95, tag:'In Stock', finish:'Natural Titanium',h:40 },
    { name:'iPhone 16',       storage:'128GB', series:'16', price:945000,  was:1020000, grade:'Grade A', battery:97, tag:'Hot',      finish:'Ultramarine',   h:232 },
    { name:'iPhone 16 Pro',   storage:'256GB', series:'16', price:1250000, was:1340000, grade:'Grade A', battery:96, tag:'In Stock', finish:'Natural Titanium',h:40 },
    { name:'iPhone 16 Pro Max',storage:'256GB',series:'16', price:1470000, was:1569000, grade:'Grade A', battery:96, tag:'Few Left', finish:'Black Titanium',h:230 },
    { name:'iPhone 17',       storage:'256GB', series:'17', price:1135000, was:null,    grade:'New',     battery:100,tag:'New',      finish:'Lavender',      h:285 },
    { name:'iPhone Air',      storage:'256GB', series:'17', price:1275000, was:null,    grade:'New',     battery:100,tag:'New',      finish:'Sky Blue',      h:200 },
    { name:'iPhone 17 Pro',   storage:'256GB', series:'17', price:1425000, was:1545000, grade:'Grade A', battery:98, tag:'Hot',      finish:'Silver',        h:220 },
    { name:'iPhone 17 Pro Max',storage:'256GB',series:'17', price:1585000, was:1699000, grade:'Grade A', battery:98, tag:'Few Left', finish:'Silver',        h:220 },
  ];

  const PHONE_SVG = `
    <svg class="p-phone" viewBox="0 0 120 240" aria-hidden="true" role="img">
      <title>Phone placeholder</title>
      <rect x="7" y="7" width="106" height="226" rx="24" fill="rgba(4,10,36,.55)"
            stroke="currentColor" stroke-width="4"/>
      <rect x="17" y="30" width="86" height="180" rx="12" fill="currentColor" opacity=".14"/>
      <rect x="45" y="15" width="30" height="7" rx="3.5" fill="currentColor" opacity=".8"/>
      <circle cx="60" cy="222" r="7" fill="none" stroke="currentColor" stroke-width="3" opacity=".7"/>
    </svg>`;

  const tagClass = (t) => t === 'Hot' ? 't-hot' : t === 'Few Left' ? 't-few' : t === 'New' ? 't-new' : 't-stock';

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const cardHTML = (p, i) => {
    const isNew = p.grade === 'New';
    const badge = isNew ? 'Brand New' : `UK Used · ${p.grade.replace('Grade ', '')}`;
    const save = p.was ? p.was - p.price : 0;
    const slug = slugify(p.name);
    const msg =
      `Hello Opeyemi Phone & Gadgets 👋, I'd like to ORDER the ${p.name} ${p.storage} ` +
      `(${p.finish}, ${badge}, ${ngn(p.price)}) from your website. Is it still available?`;
    // Eager-load first 4 images for LCP, lazy rest
    const loading = i < 4 ? 'eager' : 'lazy';
    const fetchPriority = i < 2 ? 'high' : 'auto';
    return `
      <article class="p-card" style="--h:${p.h};animation-delay:${Math.min(i, 8) * 45}ms" role="listitem">
        <div class="p-media">
          <span class="p-tag ${tagClass(p.tag)}">${p.tag}</span>
          ${p.was ? `<span class="p-was">Was ${ngn(p.was)}</span>` : ''}
          <img class="p-shot" src="img/${slug}.webp" alt="${p.name} ${p.storage} in ${p.finish} — ${badge}, battery ${p.battery}%"
               width="400" height="500" loading="${loading}" fetchpriority="${fetchPriority}" decoding="async"
               onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <span class="p-fb" hidden>${PHONE_SVG}</span>
        </div>
        <div class="p-body">
          <div class="p-top">
            <h3 class="p-name">${p.name}</h3>
            <span class="p-badge${isNew ? ' is-new' : ''}">${badge}</span>
          </div>
          <p class="p-spec"><b>${p.storage}</b> · ${p.finish} · Battery health <b>${p.battery}%</b></p>
          <div class="p-price">
            <span class="now">${ngn(p.price)}</span>
            ${p.was ? `<span class="was">${ngn(p.was)}</span>` : ''}
            ${save ? `<span class="save">Save ${ngn(save)}</span>` : ''}
          </div>
          <a class="btn btn-wa" href="${wa(msg)}" target="_blank" rel="noopener" aria-label="Order ${p.name} ${p.storage} on WhatsApp">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2zm4.6 12.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1 2.8.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.3-.4z" fill="currentColor"/></svg>
            Order via WhatsApp
          </a>
        </div>
      </article>`;
  };

  /* ---------------- shops (grid + filter chips) — shared filter state ---------------- */
  const shops = document.querySelectorAll('[data-shop]');
  let activeFilter = 'all';

  const renderAllShops = () => {
    shops.forEach((shop) => {
      const grid = shop.querySelector('[data-grid]');
      const empty = shop.querySelector('[data-empty]');
      const meta = shop.querySelector('[data-count-label]');
      if (!grid || !empty || !meta) return;
      const list = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.series === activeFilter);
      grid.innerHTML = list.map(cardHTML).join('');
      empty.hidden = list.length > 0;
      meta.textContent = `Showing ${list.length} of ${PRODUCTS.length} units in stock` + (activeFilter !== 'all' ? ` · Filter: ${activeFilter === 'x' ? 'iPhone X / XR' : 'iPhone ' + activeFilter}` : '');
    });
    // Sync chip states across all shops
    document.querySelectorAll('.chip[data-filter]').forEach((chip) => {
      const isActive = chip.dataset.filter === activeFilter;
      chip.classList.toggle('is-active', isActive);
      chip.setAttribute('aria-pressed', String(isActive));
    });
  };

  // Chip click + keyboard navigation
  shops.forEach((shop) => {
    const chips = shop.querySelectorAll('.chip[data-filter]');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        activeFilter = chip.dataset.filter;
        renderAllShops();
      });
    });
    // Arrow key navigation between chips
    const chipArray = Array.from(chips);
    shop.addEventListener('keydown', (e) => {
      const idx = chipArray.indexOf(document.activeElement);
      if (idx === -1) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        chipArray[(idx + 1) % chipArray.length].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        chipArray[(idx - 1 + chipArray.length) % chipArray.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault(); chipArray[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault(); chipArray[chipArray.length - 1].focus();
      }
    });
  });

  // Initial render
  if (shops.length) renderAllShops();

  /* ---------------- modal system — focus trap, inert, scroll lock ---------------- */
  let lastFocus = null;
  let scrollY = 0;
  const focusableSelector = 'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getFocusable = (root) => Array.from(root.querySelectorAll(focusableSelector)).filter((el) => !el.hidden && el.offsetParent !== null);

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    // Save scroll position to prevent jump on iOS
    scrollY = window.scrollY || window.pageYOffset;
    modal.hidden = false;
    document.body.classList.add('locked');
    // Prevent background from being read by screen readers
    document.querySelectorAll('header.site-header, main, footer.site-footer, .mobile-bar').forEach((el) => {
      el.setAttribute('aria-hidden', 'true');
      // inert is modern; fallback to aria-hidden
      if ('inert' in HTMLElement.prototype) el.inert = true;
    });
    // Focus first focusable inside modal
    const focusable = getFocusable(modal);
    if (focusable.length) setTimeout(() => focusable[0].focus({ preventScroll: true }), 60);
    // Trap focus handler attached per modal open (one global listener handles all)
  };

  const closeModal = (modal) => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    // Check if any modal still open
    const stillOpen = document.querySelector('.modal:not([hidden])');
    if (!stillOpen) {
      document.body.classList.remove('locked');
      // Restore background accessibility
      document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
        // Only remove from main layout, not from hero decorative etc.
        if (el.matches('header.site-header, main, footer.site-footer, .mobile-bar')) {
          el.removeAttribute('aria-hidden');
          if ('inert' in HTMLElement.prototype) el.inert = false;
        }
      });
      // Restore focus
      if (lastFocus && typeof lastFocus.focus === 'function') {
        try { lastFocus.focus({ preventScroll: true }); } catch (_) { lastFocus.focus(); }
      }
      // Restore scroll on mobile Safari where body lock may have shifted
      // No scroll jump needed because we use overflow:hidden only
    } else {
      // Focus next open modal's first element
      const focusable = getFocusable(stillOpen);
      if (focusable.length) focusable[0].focus({ preventScroll: true });
    }
  };

  document.querySelectorAll('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(modal); });
  });

  // Global key handlers: Escape to close, Tab trap
  document.addEventListener('keydown', (e) => {
    const open = document.querySelector('.modal:not([hidden])');
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal(open);
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getFocusable(open);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  /* ---------------- trade-in valuation (sell) ---------------- */
  const TRADE = {
    'iPhone 17 Pro Max':1080000,'iPhone 17 Pro':960000,'iPhone Air':840000,'iPhone 17':760000,
    'iPhone 16 Pro Max':1000000,'iPhone 16 Pro':860000,'iPhone 16':650000,
    'iPhone 15 Pro Max':730000,'iPhone 15 Pro':620000,'iPhone 15':490000,
    'iPhone 14 Pro Max':630000,'iPhone 14 Pro':515000,'iPhone 14':345000,
    'iPhone 13 Pro Max':510000,'iPhone 13 Pro':445000,'iPhone 13':295000,
    'iPhone 12 Pro Max':375000,'iPhone 12 Pro':305000,'iPhone 12':230000,
    'iPhone 11 Pro Max':270000,'iPhone 11 Pro':235000,'iPhone 11':175000,
    'iPhone XR':140000,'iPhone X':110000,'iPhone 8 Plus':75000,
    'Samsung Galaxy S25 Ultra':780000,'Samsung Galaxy S24 Ultra':580000,'Samsung Galaxy S23':380000,
    'Tecno Camon 40':195000,'Infinix Note 50':165000,'Other phone':0,
  };
  const STORAGE_MULT = { '64':1, '128':1.06, '256':1.14, '512':1.25 };
  const COND_MULT = { flawless:1, clean:.9, worn:.76, faulty:.45 };
  const BATT_MULT = { '95':1, '90':.97, '85':.93, '80':.88 };

  const fillSelect = (sel, keys) => {
    if (!sel) return;
    sel.innerHTML = keys.map((k) => `<option value="${k}">${k}</option>`).join('');
  };
  const modelKeys = Object.keys(TRADE);

  const sellForm = document.getElementById('sell-form');
  const sellModel = document.getElementById('sell-model');
  const estValue = document.getElementById('est-value');
  const estRange = document.getElementById('est-range');

  if (sellModel) {
    fillSelect(sellModel, modelKeys);
    sellModel.value = 'iPhone 13';
  }

  const round5k = (n) => Math.max(5000, Math.round(n / 5000) * 5000);

  const calcEstimate = () => {
    if (!sellModel || !sellForm) return { mid: 0, low: 0, high: 0 };
    const base = TRADE[sellModel.value] || 0;
    if (!base) return { mid: 0, low: 0, high: 0 };
    const storageEl = document.getElementById('sell-storage');
    const battEl = document.getElementById('sell-battery');
    const condInput = sellForm.querySelector('input[name="condition"]:checked');
    if (!storageEl || !battEl || !condInput) return { mid: 0, low: 0, high: 0 };
    const storage = storageEl.value;
    const batt = battEl.value;
    const cond = condInput.value;
    const mid = round5k(base * (STORAGE_MULT[storage] || 1) * (COND_MULT[cond] || 1) * (BATT_MULT[batt] || 1));
    return { mid, low: round5k(mid * 0.95), high: round5k(mid * 1.05) };
  };

  const updateEstimate = () => {
    if (!estValue || !estRange) return;
    const { mid, low, high } = calcEstimate();
    estValue.textContent = mid ? ngn(mid) : 'Call us';
    estRange.textContent = mid
      ? `Likely range: ${ngn(low)} – ${ngn(high)} · confirmed after inspection`
      : 'Select your exact model for an estimate, or call 09030393902';
  };

  if (sellForm) {
    sellForm.addEventListener('input', updateEstimate);
    sellForm.addEventListener('change', updateEstimate);
    updateEstimate();

    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const condChecked = sellForm.querySelector('input[name="condition"]:checked');
      const condLabelEl = condChecked ? condChecked.closest('label') : null;
      const condLabel = condLabelEl ? condLabelEl.querySelector('span').textContent.trim() : (condChecked ? condChecked.value : '—');
      const storageEl = document.getElementById('sell-storage');
      const battEl = document.getElementById('sell-battery');
      const { mid, low, high } = calcEstimate();
      const msg =
        `Hello Opeyemi Phone & Gadgets 👋\n\n` +
        `I want to SELL my phone:\n` +
        `• Model: ${sellModel.value}\n` +
        `• Storage: ${storageEl ? storageEl.value : '—'}GB\n` +
        `• Battery: ${battEl ? battEl.value : '—'}%+\n` +
        `• Condition: ${condLabel}\n` +
        `• Website estimate: ${mid ? `${ngn(low)} – ${ngn(high)}` : 'to be discussed'}\n\n` +
        `Please give me your final offer.`;
      window.open(wa(msg), '_blank', 'noopener');
    });
  }

  /* ---------------- swap inquiry ---------------- */
  const swapForm = document.getElementById('swap-form');
  const swapHave = document.getElementById('swap-have');
  const swapWant = document.getElementById('swap-want');
  if (swapHave) {
    fillSelect(swapHave, modelKeys);
    swapHave.value = 'iPhone 11';
  }
  if (swapWant) {
    const distinctWants = PRODUCTS.map((p) => `${p.name} ${p.storage}`).filter((v, i, a) => a.indexOf(v) === i);
    fillSelect(swapWant, distinctWants);
    if (swapWant.options.length) swapWant.value = swapWant.options[Math.min(8, swapWant.options.length - 1)].value;
  }

  if (swapForm) {
    swapForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const haveEl = document.getElementById('swap-have');
      const storageEl = document.getElementById('swap-storage');
      const condEl = document.getElementById('swap-cond');
      const wantEl = document.getElementById('swap-want');
      const noteEl = document.getElementById('swap-note');
      const msg =
        `Hello Opeyemi Phone & Gadgets 👋\n\n` +
        `I want to SWAP my phone:\n` +
        `• I have: ${haveEl ? haveEl.value : '—'} (${storageEl ? storageEl.value : '—'}, ` +
        `${condEl ? condEl.value : '—'})\n` +
        `• I want: ${wantEl ? wantEl.value : '—'}\n` +
        (noteEl && noteEl.value.trim() ? `• Note: ${noteEl.value.trim()}\n` : '') +
        `\nPlease check the value and tell me the top-up (or cash back).`;
      window.open(wa(msg), '_blank', 'noopener');
    });
  }

  /* ---------------- static WhatsApp links ---------------- */
  const welcome =
    `Hello Opeyemi Phone & Gadgets 👋 I saw your website and I'd like to ask about your phones.`;
  ['hero-wa', 'cta-wa', 'bar-wa', 'foot-wa'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = wa(welcome);
  });

  /* ---------------- header + reveal + counters ---------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    : null;
  document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

  const counters = document.querySelectorAll('[data-count]');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const runCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '+';
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
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
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Expose for debugging / testing
  window.OpeyemiShop = { PRODUCTS, TRADE, wa, ngn };
})();
