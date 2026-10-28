# Opeyemi Phone & Gadgets — Mobile-First Storefront

> **BN: 7710639** · Lagos, Nigeria · Nationwide delivery  
> Quality new & UK-used iPhones at the best price — physical inspection, battery-tested, receipt issued.

Live storefront landing page for **Opeyemi Phone & Gadgets**, built mobile-first and optimized for low-data, high-conversion WhatsApp ordering.

`index.html` · `styles.css` · `app.js` · `img/*.webp` · `manifest.json`

---

## ✨ What this PR ships (PR #1)

- **Mobile-first landing page** — hero, 3-action hub (Buy / Sell / Swap), catalog, trust signals, CTA, footer, sticky mobile bar
- **UK-used iPhone catalog** — 25 units (iPhone 8 Plus → 17 Pro Max + iPhone Air) with NGN prices (Oct 2026 dealer benchmark), filter chips, retailer-style product cards with real photos and fallback SVG
- **Zero-dependency, fast** — ~23 KB HTML, ~22 KB CSS, ~16 KB JS; system fonts, lazy images, `fetchpriority` on LCP, no framework
- **WhatsApp-first commerce** — every “Order” and valuation form opens `wa.me/2349030393902` with a pre-filled inquiry
- **Sell & Swap valuation** — instant estimate from base trade values × storage/condition/battery multipliers, rounded to ₦5k, with ±5% range
- **SEO & share** — canonical, OG/Twitter cards, JSON-LD `LocalBusiness` (BN, address, hours, phone), `theme-color`, favicon
- **Accessibility** — skip link, `aria-pressed` chips, focus trap in modals, `aria-hidden`/`inert` background, keyboard arrow navigation, `prefers-reduced-motion` support, print styles
- **PWA-ready** — `manifest.json`, `robots.txt`, `sitemap.xml`, theme colors

## 📂 Structure

```
/ (root)
├── index.html      — semantic landing page, modals, JSON-LD
├── styles.css      — mobile-first CSS variables, 560/760/1000 breakpoints
├── app.js          — catalog render, filter sync, modal, valuation, WhatsApp
├── img/            — 23 WebP product photos (iPhone 8 Plus → 17 Pro Max)
├── manifest.json   — PWA manifest
├── robots.txt      — crawler allow
├── sitemap.xml     — single-URL sitemap
└── README.md       — this file
```

## 🚀 Run locally

```bash
python3 -m http.server 8000 --bind 0.0.0.0
# open http://localhost:8000
```

No build step. Commit `img/` as WebP for best Lighthouse LCP.

## 🎯 Business logic

- **Phone:** 09030393902 → `https://wa.me/2349030393902`
- **BN:** 7710639 shown in header/footer for trust
- **Prices** in `PRODUCTS` (app.js) — update `price`/`was` and `h` hue; `TRADE` object holds buy-back base values
- **Storage multipliers:** 64=1, 128=1.06, 256=1.14, 512=1.25
- **Condition:** flawless 1, clean 0.9, worn 0.76, faulty 0.45
- **Battery:** 95%+ 1, 90% 0.97, 85% 0.93, <85% 0.88

Edit `PRODUCTS` in `app.js` to add/remove stock — slug `iphone-{model}.webp` must exist in `img/`.

## ♿ Accessibility notes

- All interactive elements have `:focus-visible` rings
- Chips use `aria-pressed` + `is-active`; arrow keys move focus
- Modals trap `Tab`/`Shift+Tab`, close on `Esc` or backdrop, restore focus
- `prefers-reduced-motion` disables reveal/counter animations
- `noscript` banner explains JS-off ordering via phone/WhatsApp

## 🔍 SEO

- `title` (≤62 chars), `description`, `canonical`, `og:*`, `twitter:*`
- `og:image` → `img/iphone-17-pro-max.webp` (replace with absolute URL on deploy)
- JSON-LD `LocalBusiness` + `openingHoursSpecification` (Mon–Sat 8am–8pm WAT)
- `robots.txt` + `sitemap.xml` for GitHub Pages

## 📱 Mobile-first

- 1-col catalog → 2-col @560px → 3-col @1000px
- Sticky header + bottom call/WhatsApp bar (hidden @1000px, `safe-area-inset-bottom`)
- Touch targets ≥44px, thumb-reachable CTAs

---

## 👤 Owner

- **Adam** (@Bravvurrq) — adamsbrght3z@gmail.com
- Interested in Network Security & Ethical Hacking — open to collaboration.

> This storefront is the brand's primary landing page. Keep prices and `BN` current, and verify WhatsApp number before each deploy.

---
© 2026 Opeyemi Phone & Gadgets · BN 7710639
