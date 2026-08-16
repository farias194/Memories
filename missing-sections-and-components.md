# Missing Sections & Components — Memories (Horizon 3.4.0 Gift Shop)

Audit date: 2026-08-15
Method: scanned `sections/`, `blocks/`, `snippets/`, `templates/*.json`, `layout/theme.liquid`, and `config/settings_schema.json`; verified which sections are actually referenced by templates/group JSONs; cross-referenced with ecommerce/gifting best-practice research.

## Status legend
- ✅ **Present & wired** — already on a template or in the header/footer group.
- ⚠️ **Present but NOT wired** — the Liquid file exists but no template/group references it (merchant can't see it in the theme editor for that page).
- ❌ **Missing** — no file, no settings, no usage anywhere.

---

## 1) What the theme already has (don't duplicate these)

**Homepage (index.json):** slideshow, product-list, collection-list, generic `section` blocks, marquee, featured-product-information, media-with-content, featured-blog-posts, store-location, testimonials, alternate-hero.

**Other templates:** product-information + product-recommendations + product-list (product), main-collection (collection), main-cart (cart), main-blog / main-blog-post (blog/article), search-header + search-results (search), main-page + hero (page), gift-quiz (page.gift-quiz), contact-form (page.contact), custom-about-story + event blocks (page.about), email-signup + main-collection-list (list-collections), password.

**Key blocks:** accordion, _accordion-row, image, text, button, group, spacer, video, menu, logo, icon, social-links, payment-icons, email-signup, contact-form, review (testimonial), filters, swatches, variant-picker, buy-buttons, add-to-cart, quantity, price, product-title, product-inventory, sku, product-custom-property, comparison-slider, marquee, _hotspot-product, custom-liquid, popup-link, follow-on-shop, accelerated-checkout, quick-add-modal snippet, gift-card-recipient form in buy-buttons.

**So the theme is very flexible** — several "missing" items below can be assembled today from generic `section` + blocks. The point of the list is which ones deserve a **dedicated section with presets, schema, and JS** so merchants get them with one click and with proper SEO/UX behavior.

---

## 2) Quick wins — wire up what already exists (⚠️)

These sections exist as files but are referenced by **zero** templates/groups, so the storefront can't use them yet:

| Section file | What it is | Why it matters |
|---|---|---|
| `header-announcements.liquid` | Announcement/rotating message bar | A gift shop almost always runs promos ("Free gift wrap this week", "Free shipping over $50"). Add it as a section to `sections/header-group.json` above `header_section`. |
| `collection-links.liquid` | Shop-by-category link tiles | Perfect for **Shop by Occasion / Shop by Recipient / Shop by Budget** merchandising on the homepage — the #1 gifting pattern. |
| `carousel.liquid` | Generic content carousel | Reusable for gift guides, bestsellers, press mentions. |
| `product-hotspots.liquid` | Image with clickable product hotspots | Great for "shop the story" or a gift-set diagram. |
| `custom-timeline.liquid` | Timeline (events/steps) | Already used implicitly via `event` blocks on about page; expose as a section. |
| `featured-product.liquid` | Single featured product spotlight | Useful for a "Gift of the Week" spotlight. |
| `hero-fade-custom.liquid` | Custom fade hero variant | Seasonal campaign hero. |
| `layered-slideshow.liquid` | Layered parallax slideshow | Premium homepage hero variant. |
| `carousel` / `custom-liquid` / `quick-order-list` / `section-rendering-product-card` | Misc utilities | Wire up or remove to avoid confusion in the theme editor. |

**Also verify:** `predictive-search` / `predictive-search-empty` are unused — check that the search header isn't supposed to render them (predictive search may be silently broken).

---

## 3) Priority 1 — missing sections that directly lift conversion (❌)

### 3.1 Countdown timer / promo urgency bar
- Purpose: deadline-driven promos ("Gift rush ends Sunday"), seasonal events (Mother's Day, Christmas, Valentine's).
- Settings: end datetime, message, background/color scheme, optional per-product or per-collection targeting, CTA link.
- Blocks: optional repeating promo messages.
- Notes: pairs with the announcement bar; add JSON-LD `SpecialAnnouncement`/`Offer` optional. Currently **no countdown anywhere** in the theme.

### 3.2 FAQ section (dedicated, with FAQPage schema)
- Purpose: answer shipping/returns/gift-wrapping questions; **SEO rich result via FAQPage JSON-LD**; cuts support tickets.
- Settings: heading, intro, layout (single-column accordion vs. two-column grid), show_schema toggle.
- Blocks: repeatable `question` block (question + answer richtext).
- Notes: an accordion can be hand-built with `accordion` blocks today, but there is no FAQ section with schema + preset. High priority for SEO.

### 3.3 Trust badges / "reasons to shop" strip
- Purpose: address purchase anxiety: free shipping, easy returns, secure checkout, gift-wrapped, local pickup, live chat.
- Settings: heading optional, columns (2–6), icon style, color scheme.
- Blocks: repeatable `icon + title + text`.
- Notes: partially achievable with `icons_with_text`-style generic blocks; a dedicated preset makes it one-click and consistent. Gift-specific badges ("Gift wrapping available", "Same-day dispatch") perform well.

### 3.4 Sticky add-to-cart bar (product page)
- Purpose: keeps Buy button visible while scrolling PDP — one of the highest-lift mobile conversions.
- Settings: show on mobile/desktop, product info + price + quantity, background scheme.
- Notes: Horizon ships a sticky header but no sticky ATC bar. Add as a block or small section in `product.json`, or a `{% section %}`-style component with IntersectionObserver JS.

### 3.5 Recently viewed products
- Purpose: retention + cross-sell; low-effort client-side section.
- Settings: heading, number of items, grid columns, source (`recently_viewed`), show price.
- Notes: store handles in localStorage/cookie via a small JS snippet; render product cards reusing existing `_product-card` blocks. No implementation exists today.

### 3.6 Instagram / social gallery grid
- Purpose: visual discovery + social proof, especially for gift shops where imagery sells.
- Settings: heading, handle or manual images, columns (2–6), crop, lightbox toggle, link to product.
- Blocks: image with optional product/URL link.
- Notes: if no Instagram app is used, support a manual image grid with lightbox — zero dependency.

### 3.7 Gift wrapping / gift options callout
- Purpose: highlight wrapping, message cards, ribbon, express dispatch — a differentiator and an upsell.
- Settings: image, heading, description, feature list, optional "Add gift wrap" link/checkbox behavior.
- Blocks: features (icon + text).
- Notes: pair with a product metafield ("has gift wrap option") and/or a cart note. Gift-card recipient form already exists in buy-buttons — extend the story with a visible callout.

### 3.8 Gift guides: "Shop by Occasion / Recipient / Budget"
- Purpose: the defining navigation pattern for gift stores — helps undecided buyers find a product fast.
- Options:
  - A dedicated **gift-guide section** (tiles linking to curated collections, e.g., "For Her", "Under $25", "Anniversary").
  - Tabs inside a featured-collection section ("Bestsellers | New | Under $25").
- Notes: `collection-links.liquid` already exists (unwired) — wire it and add presets; optionally add collection-tabbed product rows.

### 3.9 Gift sets / bundle builder block
- Purpose: raise AOV by selling curated sets ("Ultimate Spa Set", "Build your own hamper").
- Blocks: bundle product picker (multi-product with combined price) or a simple "add set" button that adds multiple line items.
- Notes: an `upsell-bundle` block already appears on the PDP (`ai_gen_block_91bfaa0` context) — formalize it into a reusable section/block with quantity-per-product.

---

## 4) Priority 2 — missing merchandising, trust & social-proof sections (❌)

### 4.1 Press / "As seen in" logo strip
- Purpose: brand credibility. Simple image row with grayscale hover. No implementation exists.

### 4.2 Star-rating display block (product cards + PDP)
- Purpose: show review stars from metafields or a review app (Shopify Product Reviews / Judge.me / Loox) directly on cards.
- Notes: `review` block exists only inside testimonials; add a lightweight `star-rating` block + aggregate summary ("4.8/5 from 212 reviews") on PDP.

### 4.3 Product tabs (details / shipping / care / FAQ) on PDP
- Purpose: condense long product info into tabs or accordion; Horizon's PDP is section-based, so tabs need a custom block.
- Blocks: repeatable tab (title + richtext), optional auto-links to metafields.
- Notes: `accordion` blocks can approximate it, but a proper tabs component with anchor links is a cleaner, dedicated component.

### 4.4 Free-shipping progress bar in cart
- Purpose: classic AOV booster ("You're $12 away from free shipping").
- Notes: needs a theme setting for the free-shipping threshold (or metafield) + small JS in `main-cart` and the cart drawer.

### 4.5 Back-in-stock / waitlist form
- Purpose: capture demand on sold-out gift items.
- Notes: typically an app (Back in Stock by Shopify, Klaviyo); if avoiding apps, a `{% form 'contact' %}`-based block on sold-out variants with email capture.

### 4.6 Gift card promotion section
- Purpose: "Give the gift of choice" — dedicated gift-card banner with image + CTA; gift-card recipient form already supported in buy-buttons.
- Notes: also consider a gift-card balance-check link block in footer.

### 4.7 Loyalty / rewards teaser section
- Purpose: "Earn points on every gift" — typically app-driven (Smile, LoyaltyLion); a static teaser section + footer link keeps it dependency-free.

### 4.8 Newsletter popup (welcome/exit-intent)
- Purpose: capture emails for gifting seasons; Horizon has popover/drawer infrastructure (`popovers_and_modals` settings, `popup-link` block) but no popup section.
- Settings: enable, delay, exit-intent toggle, image, dismiss storage, success message.
- Notes: keep it optional and non-blocking for accessibility/SEO.

### 4.9 Video / story section (beyond media-with-content)
- Purpose: brand story, "how we wrap gifts", customer unboxing; supports `video` block today — a dedicated full-width video section with poster + autoplay-off default improves consistency.
- Notes: optional — `media-with-content` may suffice; include only if hero-style video is wanted.

### 4.10 Multi-column "shop the look" / curated gift collection tiles
- Purpose: editorial merchandising ("Romantic", "Cozy", "For Dad") using image tiles with hover overlay + price.
- Notes: partially possible with `collection-list`; a dedicated variation with hover CTA + aspect-ratio control is worth a preset.

---

## 5) Priority 3 — smaller components/blocks (❌ unless noted)

| Component | Notes |
|---|---|
| Share buttons (social + copy link) on PDP/blog | No `share` snippet exists. Add `_share-buttons` block. |
| Scroll-to-top button | Tiny snippet + JS; Horizon has none. |
| Back-to-collection / breadcrumb on PDP | Improves navigation; check if PDP already shows breadcrumbs in `_product-details`. |
| Stock level indicator ("Only 3 left") | Urgency block; needs product inventory metafield/quantity checks (JS). |
| Quantity-break / volume pricing | For bulk gifting/corporate orders; block on PDP or collection. |
| Store pickup / local delivery notice | Gift shops often do local delivery — a small info block tying into `store-location`. |
| Gift message textarea on product/cart | `cart-note.js` exists — confirm gift-message line-item property support and surface it. |
| Print-friendly gift-card page | Gift cards get printed — ensure the gift-card template is print-optimized (it's a separate `gift_card.liquid` template). |
| Comparison table (vs. competitors / set contents) | `comparison-slider` block exists; a table block is different and useful for sets. |
| Before/after or zoom gallery extras | `_product-media-gallery` exists; add drag-zoom already present in assets (`drag-zoom-wrapper.js`). |

---

## 6) Recommended build order

1. **Wire the announcement bar** into `header-group.json` (free win, zero build).
2. **Countdown timer** section (seasonal urgency) — or extend announcement bar with a countdown variant.
3. **FAQ section** with FAQPage JSON-LD (SEO + support deflection).
4. **Trust badges strip** (one-click preset from existing icon/text blocks).
5. **Gift wrapping callout + Gift guides (Shop by Occasion/Budget)** — the two gift-specific differentiators.
6. **Sticky add-to-cart** on PDP.
7. **Recently viewed + Instagram grid** (client-side, cheap).
8. **Cart free-shipping progress bar** (AOV).
9. Then the Priority-2 social-proof/trust items (press strip, star ratings, popup).

## 6b) Editor vs. Code — what actually needs development

The generic **Custom section** (`section.liquid`) registers `@theme` blocks, meaning the theme editor can assemble almost any content layout from the existing blocks (text, image, button, group, icon, accordion, video, email-signup, contact-form, custom-liquid, spacer, divider…), and every unused section below has a preset so it appears in the editor's "Add section" picker.

### ✅ Buildable in the theme editor today (no code)
| Item | How |
|---|---|
| Announcement bar | Add existing `header-announcements` section to the Header group (Customize → header group → Add section). Has a preset. |
| FAQ (accordion) | Custom section + heading + repeatable `accordion` blocks. |
| Trust badges strip | Custom section, horizontal direction + repeated `group`(icon+text). |
| Gift wrapping callout | Custom section: image + heading + text + feature icons + button. |
| Gift guides / Shop by Occasion–Recipient–Budget | Add existing `collection-links` section (has preset). |
| Gift card promo / loyalty teaser / pickup notice | Custom section: image/text/button. |
| Press logo strip (basic) | Custom section + `image` blocks in a row; grayscale hover needs a small CSS tweak (or `custom-liquid`). |
| Video / story block | Existing `media-with-content` section or `video` block inside a custom section. |
| Gift sets / bundles | `upsell-bundle` block already exists (already used on the PDP). |
| Marquee, dividers, spacers, email signup, contact form | Already available as blocks/sections. |

### ❌ Must be created as code (new section/block + JS) — or via app
| Item | Why it can't be done in the editor |
|---|---|
| Countdown timer | No countdown logic anywhere in the theme (only a hand-rolled `custom-liquid` JS hack would "work"). |
| Sticky add-to-cart bar | No sticky ATC component; needs IntersectionObserver JS. |
| Recently viewed | Needs localStorage + dynamic product-card rendering. |
| Free-shipping progress bar in cart | Needs JS + a free-shipping threshold setting. |
| Star-rating block on cards/PDP | Only the testimonials `review` block exists; no standalone star display. |
| Newsletter popup (welcome/exit-intent) | Needs a popup section + JS + dismiss cookie. |
| Back-in-stock form | Needs variant-aware form logic (or an app). |
| Share buttons | No `share` snippet exists in the theme. |
| FAQ JSON-LD schema | Editor accordions emit no FAQPage schema (a `custom-liquid` script injection is fragile). |
| Product tabs (real tabs) | Accordion approximates it; actual tab switching needs code. |
| Scroll-to-top, stock-level indicator, breadcrumbs on PDP, quantity breaks | Small JS/components; none exist. |

### ⚠️ Hybrid — possible in editor but much better with code/app
- **Instagram grid**: manual `image` blocks + links work; a real feed or lightbox needs an app or code.
- **Press logos grayscale hover**: images work; the effect needs CSS.
- **Gift message field**: `cart-note.js` exists, but a per-line-item gift message needs small code.
- **Comparison table**: Shopify's rich-text editor has no table support → `custom-liquid`.

**Bottom line:** roughly 2/3 of the recommended list is achievable in the editor today; the items that genuinely need development are the countdown, sticky ATC, recently viewed, free-shipping progress bar, star ratings, newsletter popup, back-in-stock, share buttons, and FAQ schema — most of which could also be handled by third-party apps if code isn't desired.

## 7) References & inspiration sources
- [Best Shopify Sections to Boost Sales — Section Store](https://section.store/blogs/store-design-optimisation/best-shopify-sections-to-boost-sales)
- [Shopify Product Page Template: High-Converting Layouts 2025 — Section Store](https://section.store/blogs/store-design-optimisation/shopify-product-page-template-the-ultimate-guide-to-high-converting-layouts-2025)
- [How to Build a Shopify Gift Guide (2026 Examples + Templates) — Identixweb](https://www.identixweb.com/how-to-build-shopify-gift-guides/)
- [Gift & Occasion-Based Navigation — Ecomate CRO course](https://ecomate.co/blogs/cro-course-module-3-product-discovery-collection-strategy/3-4-gift-occasion-based-navigation)
- [Gift guide navigation: the highest-conversion addition to any holiday menu — Navi+](https://naviplus.io/ideas/sell-gift-guide-navigation/)
- [Shopify Horizon Theme: Features & suitability — BSS Commerce](https://bsscommerce.com/shopify/shopify-horizon-theme-review/)
- [Horizon Shopify Theme: Minimal Design, Maximum Flexibility — PowerCommerce](https://powercommerce.com/el/blogs/themes/horizon-shopify-theme)
- [200+ High-Converting Sections to Upgrade Any Theme — Section Modulo (Shopify App Store)](https://apps.shopify.com/modulo-sections-bundles)
- [Shopify Sections Everywhere: CRO Opportunities — CustomFit](https://www.customfit.ai/blog/shopify-cro/shopify-sections-everywhere-cro)
- [How to Boost Your Conversion Rate by Choosing the Right Shopify Theme — Boostheme](https://boostheme.com/blogs/news/how-to-boost-your-conversion-rate-by-choosing-the-right-shopify-theme)
