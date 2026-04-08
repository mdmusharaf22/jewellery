# SriGaneshJewellers - Next.js Website

A modern, responsive jewellery e-commerce website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern Next.js 15 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Component-based architecture
- ✅ Static data (ready for backend integration)
- ✅ SEO optimized
- ✅ Fast performance

## Project Structure

```
sriganesh-jewellers/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Top navigation
│   ├── Hero.tsx            # Hero section
│   ├── CategorySection.tsx # Category grid
│   ├── PopularPicks.tsx    # Featured products
│   ├── SavingsScheme.tsx   # Savings plan section
│   ├── NewArrivals.tsx     # New products with tabs
│   ├── Craftsmanship.tsx   # Features section
│   ├── Testimonials.tsx    # Customer reviews
│   └── Footer.tsx          # Footer
└── public/                 # Static assets (images)
```

## Getting Started

### Install Dependencies
```bash
cd sriganesh-jewellers
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Sections Implemented

1. **Header** - Sticky navigation with mobile menu
2. **Hero** - Main banner with CTA
3. **Shop by Category** - 5 category circles
4. **Popular Picks** - 4 featured products
5. **Savings Scheme** - 10+1 plan details
6. **New Arrivals** - Tabbed product grid (All/Gold/Silver/Bridal)
7. **Craftsmanship** - 4 feature cards
8. **Testimonials** - 3 customer reviews
9. **Footer** - Links, newsletter, contact info

## Color Scheme

- Gold Primary: `#D4AF37`
- Gold Dark: `#B8941E`
- Gold Light: `#F4E4C1`
- Brown Dark: `#3E2723`
- Brown Medium: `#5D4037`
- Cream: `#FFF8E7`

## Next Steps

- [ ] Add real product images
- [ ] Integrate backend API
- [ ] Add product detail pages
- [ ] Implement shopping cart
- [ ] Add authentication
- [ ] Connect payment gateway
- [ ] Add admin panel

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- ESLint

## License

© 2026 SriGaneshJewellers
