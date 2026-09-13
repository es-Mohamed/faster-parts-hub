# Faster automotive parts platform

## What I’ll build
- Create an Arabic-first, RTL storefront at `/` with the uploaded Faster mark, black/yellow brand styling, desktop header, expanding search, category cards, partner banner, prominent vehicle-brand logo strip, four-column desktop and two-column mobile product grids, trust highlights, and a fixed mobile bottom bar.
- Add a smooth Arabic/English direction switch that updates all visible storefront copy and layout direction.
- Add dedicated pages for product details, categories, cart, and account so every navigation item leads somewhere real.
- Build the product details view with image gallery selection, vehicle compatibility labels, quantity controls, price, add-to-cart and wholesale-quote actions, plus related products.
- Keep cart state available across pages during the current browser session, including quantities and totals.
- Add home-screen install support with a manifest and icons, without offline caching because offline behavior was not requested.

## Visual direction
- Strict black, white/off-white, and racing-yellow palette from the supplied references.
- Compact premium automotive catalog styling with crisp cards, restrained shadows, large readable product imagery, and no decorative gradients.
- Responsive composition matching the references: mobile app shell with bottom navigation; wider desktop catalog with four products per row.
- Use locally created brand treatments for ISUZU, Chevrolet, Toyota, and Nissan in a prominent ticker rather than plain brand names.

## Technical details
- Use the project’s TanStack Router (the supported React router for this stack) for typed standalone routes and navigation.
- Define all visual colors and states as semantic Tailwind tokens in the global design system.
- Store the supplied Faster brand image through the project asset system and create a square favicon from it.
- Build reusable catalog, navigation, language, and cart primitives; use Lucide icons for interface controls.
- Add route-specific titles, descriptions, Open Graph metadata, and accessible labels/alt text.
- Verify the result at desktop and mobile sizes, including route navigation, expanding search, language direction, gallery selection, and cart updates.
