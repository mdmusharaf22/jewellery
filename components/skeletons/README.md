# Skeleton Loading Components

This directory contains reusable skeleton loading components that provide consistent loading states across the application.

## Overview

Skeleton loaders improve user experience by:
- Showing content structure while data loads
- Reducing perceived loading time
- Providing visual feedback that content is coming
- Maintaining consistent loading states across all pages

## Available Skeletons

### 1. **ProductCardSkeleton**
Used for individual product cards in grids and carousels.

```tsx
import { ProductCardSkeleton } from '@/components/skeletons';

<ProductCardSkeleton />
```

### 2. **ProductGridSkeleton**
Used for product listing pages with multiple products.

```tsx
import { ProductGridSkeleton } from '@/components/skeletons';

<ProductGridSkeleton count={8} /> // Shows 8 skeleton cards
```

**Props:**
- `count` (optional): Number of skeleton cards to display (default: 8)

### 3. **ProductCarouselSkeleton**
Used for product carousels on the homepage and category pages.

```tsx
import { ProductCarouselSkeleton } from '@/components/skeletons';

<ProductCarouselSkeleton 
  title="Popular Picks" 
  subtitle="Most-loved pieces from our collection"
/>
```

**Props:**
- `title` (optional): Carousel title
- `subtitle` (optional): Carousel subtitle

### 4. **ProductDetailSkeleton**
Used for product detail pages while product data loads.

```tsx
import { ProductDetailSkeleton } from '@/components/skeletons';

<ProductDetailSkeleton />
```

### 5. **CartSkeleton**
Used for the shopping cart page while cart data loads.

```tsx
import { CartSkeleton } from '@/components/skeletons';

<CartSkeleton />
```

### 6. **CheckoutSkeleton**
Used for the checkout page while user profile and cart data loads.

```tsx
import { CheckoutSkeleton } from '@/components/skeletons';

<CheckoutSkeleton />
```

### 7. **ProfileSkeleton**
Used for user profile sections in the account page.

```tsx
import { ProfileSkeleton } from '@/components/skeletons';

<ProfileSkeleton />
```

### 8. **WishlistSkeleton**
Used for the wishlist section in the account page.

```tsx
import { WishlistSkeleton } from '@/components/skeletons';

<WishlistSkeleton />
```

### 9. **PageSkeleton**
Generic page loading skeleton for simple loading states.

```tsx
import { PageSkeleton } from '@/components/skeletons';

<PageSkeleton />
```

## Usage Examples

### In a Component with Loading State

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ProductGridSkeleton } from '@/components/skeletons';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### In a Page Component

```tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductDetailSkeleton } from '@/components/skeletons';

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct().then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <ProductDetailSkeleton />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
```

## Design Principles

1. **Consistency**: All skeletons use the same animation (`animate-pulse`) and color scheme (`bg-gray-200`)
2. **Responsive**: Skeletons adapt to different screen sizes using Tailwind's responsive classes
3. **Accurate Layout**: Skeletons match the actual content layout as closely as possible
4. **Performance**: Skeletons are lightweight and render quickly

## Styling

All skeletons use:
- `animate-pulse` for the loading animation
- `bg-gray-200` for skeleton elements
- Tailwind CSS responsive classes for mobile-first design
- Consistent spacing and sizing with the actual components

## Adding New Skeletons

When creating a new skeleton component:

1. Create the component file in `components/skeletons/`
2. Match the layout of the actual component
3. Use `animate-pulse` and `bg-gray-200` for consistency
4. Make it responsive with Tailwind classes
5. Export it from `components/skeletons/index.ts`
6. Document it in this README

Example:

```tsx
// components/skeletons/NewComponentSkeleton.tsx
export default function NewComponentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}
```

Then add to `index.ts`:

```tsx
export { default as NewComponentSkeleton } from './NewComponentSkeleton';
```

## Pages Using Skeletons

- ✅ Home page (`/`) - ProductCarousel components
- ✅ Product listing (`/products/[category]`) - ProductDetail or ProductGrid
- ✅ Product detail (`/p/details/[slug]`) - ProductDetailSkeleton
- ✅ Cart page (`/cart`) - CartSkeleton
- ✅ Checkout page (`/checkout`) - CheckoutSkeleton
- ✅ My Account page (`/my-account`) - ProfileSkeleton, WishlistSkeleton, PageSkeleton
- ✅ New Arrivals component - ProductCardSkeleton

## Browser Support

Skeletons work in all modern browsers that support:
- CSS animations
- Tailwind CSS
- React 18+

## Performance

Skeletons are optimized for performance:
- No external dependencies
- Pure CSS animations
- Minimal DOM elements
- Fast initial render
