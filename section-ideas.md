Section ideas for Memories (Gift Shop)

This file lists recommended sections to add to the theme and includes suggested structure (schema settings, blocks, markup and behavior notes). Use these as blueprints for implementation.

Top priorities

1) Testimonials / Reviews Carousel
- Purpose: Social proof to increase conversion.
- Schema settings:
  - heading (text)
  - layout: carousel | grid
  - autoplay (boolean)
  - autoplay_interval (range)
  - show_stars (boolean)
  - box_style: card | flat
- Blocks (repeatable): review
  - block settings: reviewer_name (text), rating (1-5 number), quote (textarea/richtext), image (image_picker), source (text, e.g., "Google/Shopify")
- Markup suggestions:
  - wrapper .testimonials-{section.id}
  - inner: carousel track (or grid fallback)
  - each item: .testimonial-card with star markup, quote, meta
- JS: accessible carousel (flickity / simple native carousel); lazy-load images; text-truncate + "read more" for long quotes
- Presets: "Customer reviews (carousel)", "Customer reviews (grid)"

2) Store location & hours (Visit Us)
- Purpose: Show address, open hours, map embed, contact options, directions link.
- Schema settings:
  - heading
  - address (textarea)
  - google_maps_embed_url (text)
  - show_directions_button (boolean)
  - hours (list of day/time pairs or multiline text)
  - phone (text)
  - highlight (checkbox) — adds a card style
- Blocks: optional extra location (for multi-store) or contact detail blocks
  - block: location (name, address, map_url, hours)
- Markup suggestions:
  - left: map iframe (or static image with link)
  - right: address card with hours and CTA (Get directions, Call)
  - mobile: stacked with map on top
- Integrations: support Google Maps link for directions; optionally static map image as fallback for privacy/amp

3) Instagram / Gallery Grid
- Purpose: Visual discovery and social signal; link to product pages where possible.
- Schema settings:
  - heading
  - source: instagram_handle | asset_grid | manual_images
  - columns (2-6)
  - image_crop: square | landscape | original
  - show_product_links (boolean)
  - limit (number)
- Blocks: image block (image, caption, optional product_handle / url)
- Markup suggestions:
  - responsive grid (CSS grid) with lightbox on click
  - overlay icons if linked to product or external (Instagram)
- JS: lightbox for full-size images, lazy-load, optionally fetch Instagram via server-side app or manual upload images

4) Gift wrapping / Gift options callout
- Purpose: Highlight gift-wrapping or special packaging and gift message options.
- Schema settings:
  - heading
  - description (richtext)
  - image (image_picker)
  - show_in_cart_link (boolean)
- Blocks: features (icon + text) to list what’s included (wrapping, card, express service)
- Markup suggestions:
  - card with image + bullets + CTA (Learn more or Add to cart)

5) Gift Finder / Quiz (conversion tool)
- Purpose: Guide uncertain buyers to suitable gifts by budget, category, personality.
- Schema/Settings:
  - heading
  - intro_text
  - question_sets (array or blocks): each question block: type (single|multi), question_text, options (label, product_handle optional)
  - results_template (map from result key to product recommendations or collection)
- Blocks:
  - question (text, options as JSON or multiple option sub-settings)
- Implementation notes:
  - JS-driven single-page flow: stepper with progress, store answers in memory and map to product handles
  - Serverless alternative: redirect to prefiltered collection pages based on query params
- Accessibility: keyboard nav, store ephemeral state in sessionStorage so users can continue

Medium value / Helpful extras

6) Announcement / Countdown (promo) section
- Small horizontal banner with optional days/hours countdown
- Settings: message, background color, countdown_end (datetime), CTA

7) Trust badges / quick utilities row
- Use the existing "icons_with_text" presets or create a dedicated section for a consistent design
- Settings: repeatable badge blocks (icon, title, text)

8) Recently viewed / Suggested for you
- Settings: heading, number_of_items, source (recently_viewed | recommended)
- Implementation: client-side cookie/localStorage to store handles, then render cards

Implementation notes and conventions
- Reuse the generic section.liquid presets where possible (FAQ, contact form, email signup) to stay consistent with the rest of the theme.
- Keep section schema settings minimal and theme-friendly: toggles for showing/hiding elements and options for layout and colors.
- Provide sensible accessibility defaults (aria labels, visible focus states, keyboard carousel controls).
- Provide at least one preset for each section so it appears in the theme editor pre-populated.

Next steps
- If you'd like, implement the top-priority sections in order: Testimonials -> Store location -> Instagram gallery. I can create the Liquid + schema + blocks and a small JS helper for each.

---
Generated for: Memories (Horizon Custom)
Date: 2026-08-15
