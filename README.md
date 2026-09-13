# Fasetr Parts Hub

Create a comprehensive, premium B2B & B2C automotive spare parts platform and Progressive Web App (PWA) for "Faster" (فاستر), using React, Vite, Tailwind CSS, React Router, and Lucide React icons. 

CRITICAL INSTRUCTIONS based on the provided reference image:

1. Color Mapping & Layout (STRICT adherence to the image):

- Header & Bottom Navigation: Deep Pitch Black (#0A0A0A). Icons and text inside them should be white (inactive) and Vibrant Yellow (active).

- Main App Background (Body): Clean White or Very Light Off-White (#F8F9FA) for the sections containing categories, products, and banners.

- Cards (Categories, Products, Feature highlights): Pure White backgrounds with subtle, soft drop shadows for depth, and slightly rounded corners.

- Accents, Banners & Primary Buttons: Vibrant Racing Yellow (#FACC15). Use this for the "Trade Partner" banner background (with black text inside), "Original" tags, and "Add (+)" buttons.

2. Language & Direction:

- Default UI Language: Arabic (RTL).

- Provide a smooth toggle in the header to switch to English (LTR).

3. Car Brands Marquee/Ticker:

- Do NOT use plain text for the brands. 

- Use large, high-quality image placeholders specifically sized for the official logos of: ISUZU, Chevrolet, Toyota, and Nissan.

- Ensure the logos are large and prominent enough to be easily recognizable on both desktop and mobile views, scaling appropriately.

4. Header & Navigation (Responsive):

- Desktop: Logo on the absolute left. The absolute right contains the Language Switcher, Search Icon, and Account/Login icons. 

- Search Behavior: A simple magnifying glass icon that smoothly expands into a wide search input bar with a glowing yellow border when clicked.

- Mobile: Hide the top navigation links. Keep the top bar clean (Logo, Language, Search) on a Black background. 

- Mobile Bottom Navigation: Sticky app-style bottom bar on a Black background with: Home, Categories, Cart, Account. Use the yellow accent for the active tab.

5. Hero Section & Banners:

- Ensure images use `object-contain` or adjusted aspect ratios on mobile so they are not cropped.

6. Product Grid (Responsive Layout):

- Desktop: Strictly 4 product cards per row (`grid-cols-4`). Compact, premium card dimensions.

- Mobile: Strictly 2 product cards per row (`grid-cols-2`). 

7. Product Routing:

- Implement React Router. Clicking a product card MUST navigate to a standalone "Product Details" page (DO NOT use modals).

- Product Details Page must contain: High-res image gallery, strict compatibility tags (e.g., ISUZU D-Max, Chevrolet El Dababa), pricing, "Add to Cart" button, "Request Wholesale Quote" button, and a dedicated "Related Products" grid.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cbf85369-aa7a-410b-90c8-52db0107a41f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
