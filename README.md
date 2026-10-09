# Top Knotch Boxing

A custom, mobile-first apparel storefront for Top Knotch Boxing. The approved editorial redesign puts clothing and red-glove campaign imagery first, with a focused article about the Mahmoud family behind the mark.

## First Vercel deployment

Import this GitHub repository into Vercel. Use the repository root and **Other** as the framework preset. The included `vercel.json` supplies:

- Build command: `npm run build`
- Output directory: `dist`
- Clean page URLs and basic response security headers

Use Node.js 24. No environment variables or paid services are required for the initial concept storefront. Vercel deploys the root `api/` functions alongside the static pages. There are no runtime npm dependencies and no package-lock.json.

## Pages and behavior

- `/`: product-first campaign, featured product, collection, “The cat on the chest” editorial link and category browse.
- `/shop`: four concept products, category filters, search, sorting, product details, size choices and a persistent sample bag.
- `/about`: “The cat on the chest,” an editorial article about Abdul Jaami Mahmoud’s Top Cat nickname, the AJM tribute, and David Mahmoud.
- `/contact`: inquiry form with honest delivery state. Before a contact endpoint is configured, the form copies a draft rather than claiming to send it.

The concept products and prices are illustrative, clearly labeled, and cannot be purchased. No fight records, championships, quotes, endorsements, customer reviews, contact addresses or product performance claims have been invented.

## Connect Shopify later

In Vercel’s environment variables, set:

| Variable | Value |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | The actual `your-shop.myshopify.com` domain, without a protocol or path |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | A **public Storefront API access token**, not an Admin API token or app secret |
| `SHOPIFY_API_VERSION` | `2026-07` (default) |

Publish the intended products to the appropriate Shopify storefront / Headless sales channel with product-read access. Redeploy after adding environment variables. The catalog then switches to Shopify titles, descriptions, images, product types, variants, prices and availability. Product types supply the category filters. The endpoint paginates the product catalog and reads up to 250 variants per product; expand variant pagination if a future product needs more. The initial storefront is single-market and uses the shop’s default currency.

Checkout posts only variant IDs and quantities to a server endpoint. Shopify creates the cart, calculates authoritative prices and returns its hosted checkout URL. The API token stays server-side. Unavailable-quantity warnings and Shopify errors stop checkout rather than silently changing the order. The bag is stored locally as variant IDs and quantities, and stale sample lines are removed when the live catalog loads.

Before opening sales, verify a real test order, inventory changes, shipping/tax settings, policies and actual product imagery. Update the contact FAQ’s concept-collection answer at that point. Live Shopify behavior has been tested with mocked responses only; no store credentials were supplied for this build.

Official reference: https://shopify.dev/docs/api/storefront/2026-07/mutations/cartCreate

## Connect contact delivery later

`CONTACT_EMAIL` optionally exposes a verified public contact email. `CONTACT_WEBHOOK_URL` optionally enables form submission to an HTTPS service accepting JSON `{ name, email, topic, message, source }`. It remains server-only. Set this to a verified delivery service and validate a real received inquiry before opening the channel. The service should enforce durable spam/rate controls. Basic origin checking, field validation, a honeypot and a request-size check are already included. No inquiry database or email provider is provisioned.

## Source map

- `src/app.js`: accessible native dialogs, category menu, search, catalog and bag interactions, contact form.
- `src/views.js`: editorial page layouts, shared navigation and footer.
- `src/style.css`: responsive brand styling and reduced-motion support.
- `src/catalog.js`: sample product data and cart sanitization.
- `src/template.html`: page shell and metadata.
- `api/store.js`, `lib/shopify.js`: catalog and checkout integration.
- `api/contact.js`: contact availability and optional message delivery.
- `scripts/build.mjs`: dependency-free static build.
- `public/assets/`: supplied restored logo and AI-generated editorial/concept product artwork.
- `test/store.test.js`: purchase-mode, API and contact failure-state checks.

The editorial gym image is illustrative, not presented as a photograph of the family’s actual gym. Product images are concept mockups, not confirmed merchandise. The restored logo was supplied and approved in the build brief; original PNG is preserved intact. Typography uses Google Fonts with local system fallbacks.

## Verification

`npm run check`, `npm test`, and `npm run build` passed before the initial commit. Ten automated tests cover concept mode, checkout gating, live catalog pagination, variant mapping, API failures, checkout quantities, inventory warnings, honest contact states and malformed saved carts.

Browser-based layout / interaction testing and the first Vercel deployment remain to be performed. The owner requested to handle the initial Vercel deployment.

## Editorial redesign — October 8, 2026

Approved direction: product-first minimalist commerce, red boxing gloves, numbered image-led navigation and a quieter magazine-style brand story. `campaign.png` is illustrative model photography, not a portrait of David or Abdul. `gloves.png` is a decorative cutout, not a purchasable product. Category links derive from the active catalog and support direct `/shop?category=Tees` links; search supports `/shop?q=...`. The hero product switches to the live Shopify catalog with the rest of the shop.

The same build and commerce checks passed following the redesign. Page templates and referenced assets were checked locally; browser-based visual testing remains unavailable in this environment.

## Structure-first review — October 9, 2026

Campaign, boxing-detail, and sample product photography use lightweight labeled HTML/CSS placeholders. The approved logo remains in place. Existing generated assets are retained as unused options, with no new image generation required. The four-page structure, category menu, search, product options, sample bag, and Shopify adapter remain functional. Real Shopify product images will display when the live catalog is connected.

## Existing imagery restored — October 9, 2026

The homepage uses the existing ring image. Sample products use their original collection mockups throughout the grid, featured product, category navigation, product details, and bag. Live Shopify images take priority; live products without an image retain a neutral placeholder. Decorative boxing-detail slots remain placeholders. Syntax checks and the static build passed for this update.

## Training and family story — October 9, 2026

Expanded the homepage and About story to represent David’s training company and apparel together, including his work with accomplished boxers and the family legacy behind AJM. Added training enquiries to Contact and updated page descriptions. Replaced emoji-capable directional characters with monochrome SVG icons across the shared mobile and desktop UI.

## Navigation and ring poster hero — October 9, 2026

Desktop now has a persistent, numbered Home / Shop / About / Contact navigation bar. The mobile drawer uses the same four pages, without product cards or categories, and closes when resizing to desktop. The homepage hero uses the existing ring image as a full-width poster with oversized “In your corner” typography and separate apparel and training links. The collection and expanded family story follow below. Removed the old hero product renderer and decoupled page navigation from catalog loading.

Validation: syntax checks, static build, all four rendered views, desktop/mobile active-page states, navigation destinations, image asset paths, and the no-emoji check passed. Browser-based visual QA remains unavailable in the managed environment.


## Dedicated story and contact imagery — October 9, 2026

Added two new editorial boxing-gym hero images that share the homepage ring image’s visual language. The About hero uses a wider training-room composition with gloves on the canvas; the Contact hero uses a close red-corner composition with wrapped gloves on the ropes. Both are responsive and use separate crops on mobile.


## Shop hero imagery — October 9, 2026

Added a dedicated Shop hero image featuring the sample apparel and boxing gloves in the same ringside gym setting. The Shop masthead now uses that image as an editorial product panel with a responsive mobile crop.


## Uniform hero system — October 9, 2026

Shop, About, and Contact now use the same red top strip, image-stage height, typography spacing, dark overlay, and responsive behavior as the homepage hero. Each page keeps its own dedicated boxing image.


The previous Shop masthead split layout was replaced after review so it now follows the shared hero system exactly.
