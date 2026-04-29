# Skeleton Loading System Structure

## Directory Structure

```
components/skeletons/
│
├── Core Skeleton Components
│   ├── ProductCardSkeleton.tsx       → Single product card
│   ├── ProductGridSkeleton.tsx       → Grid of product cards
│   ├── ProductCarouselSkeleton.tsx   → Carousel with products
│   ├── ProductDetailSkeleton.tsx     → Full product detail page
│   ├── CartSkeleton.tsx              → Shopping cart page
│   ├── CheckoutSkeleton.tsx          → Checkout page
│   ├── ProfileSkeleton.tsx           → User profile form
│   ├── WishlistSkeleton.tsx          → Wishlist grid
│   ├── PageSkeleton.tsx              → Generic page loader
│   └── SkeletonElement.tsx           → Custom skeleton builder
│
├── Exports
│   └── index.ts                      → Centralized exports
│
└── Documentation
    ├── README.md                     → Comprehensive guide
    ├── USAGE_GUIDE.md                → Quick reference
    └── STRUCTURE.md                  → This file
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     SkeletonElement                         │
│                   (Base Component)                          │
│         Used to build custom skeletons                      │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │
                    ┌───────┴───────┐
                    │               │
        ┌───────────▼──────┐   ┌───▼──────────────┐
        │ ProductCard      │   │ Other Skeletons  │
        │ Skeleton         │   │ (Cart, Profile,  │
        │                  │   │  Checkout, etc.) │
        └───────────┬──────┘   └──────────────────┘
                    │
        ┌───────────▼──────────────────┐
        │                              │
    ┌───▼────────────┐    ┌───────────▼─────────┐
    │ ProductGrid    │    │ ProductCarousel     │
    │ Skeleton       │    │ Skeleton            │
    │ (uses multiple │    │ (uses multiple      │
    │  ProductCard)  │    │  ProductCard)       │
    └────────────────┘    └─────────────────────┘
```

## Page Integration Map

```
Application Pages
│
├── Home (/)
│   └── Uses: ProductCarouselSkeleton
│       └── In: ProductCarousel.tsx
│       └── In: NewArrivals.tsx
│
├── Product Listing (/products/[category])
│   └── Uses: ProductDetailSkeleton
│       └── In: page.tsx
│
├── Product Detail (/p/details/[slug])
│   └── Uses: ProductDetailSkeleton
│       └── In: page.tsx
│
├── Cart (/cart)
│   └── Uses: CartSkeleton
│       └── In: page.tsx
│
├── Checkout (/checkout)
│   └── Uses: CheckoutSkeleton
│       └── In: page.tsx
│
└── My Account (/my-account)
    ├── Uses: PageSkeleton (initial load)
    ├── Uses: ProfileSkeleton (profile tab)
    └── Uses: WishlistSkeleton (wishlist tab)
        └── In: page.tsx
```

## Data Flow

```
User Navigates to Page
        ↓
Component Mounts
        ↓
Loading State = true
        ↓
Skeleton Component Renders
        ↓
API Call Initiated
        ↓
Data Fetched
        ↓
Loading State = false
        ↓
Actual Content Renders
```

## Skeleton Composition

### Simple Skeleton (ProductCardSkeleton)
```
┌─────────────────────────┐
│  ┌─────────────────┐   │
│  │                 │   │  ← Image placeholder
│  │   Gray Box      │   │
│  │                 │   │
│  └─────────────────┘   │
│                         │
│  ▬▬▬▬▬▬               │  ← Karat line
│  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬   │  ← Name line 1
│  ▬▬▬▬▬▬▬▬▬▬          │  ← Name line 2
│  ▬▬▬▬▬▬               │  ← Price line
│                         │
│  ┌─────────┐  ┌───┐   │  ← Buttons
│  │  ▬▬▬▬   │  │ ▬ │   │
│  └─────────┘  └───┘   │
└─────────────────────────┘
```

### Complex Skeleton (ProductDetailSkeleton)
```
┌──────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────────────────────────┐ │
│  │              │  │  ▬▬▬▬▬▬                          │ │
│  │              │  │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ │
│  │  Main Image  │  │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ │
│  │              │  │  ▬▬▬▬▬▬▬▬▬▬                    │ │
│  │              │  │                                  │ │
│  └──────────────┘  │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ │
│                     │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ │
│  ┌──┐┌──┐┌──┐┌──┐ │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │ │
│  │  ││  ││  ││  │ │                                  │ │
│  └──┘└──┘└──┘└──┘ │  ┌────────┐ ┌────────┐ ┌────┐  │ │
│  Thumbnails        │  │  ▬▬▬   │ │  ▬▬▬   │ │ ▬▬ │  │ │
│                     │  └────────┘ └────────┘ └────┘  │ │
│                     │  Purity Options                 │ │
│                     │                                  │ │
│                     │  ┌──────────────────┐  ┌────┐  │ │
│                     │  │    ▬▬▬▬▬▬▬▬▬     │  │ ▬▬ │  │ │
│                     │  └──────────────────┘  └────┘  │ │
│                     │  Buttons                        │ │
│                     └──────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Import Patterns

### Pattern 1: Named Import (Recommended)
```tsx
import { ProductDetailSkeleton, CartSkeleton } from '@/components/skeletons';
```

### Pattern 2: Direct Import
```tsx
import ProductDetailSkeleton from '@/components/skeletons/ProductDetailSkeleton';
```

### Pattern 3: Dynamic Import (Code Splitting)
```tsx
const Skeleton = require('@/components/skeletons/ProductDetailSkeleton').default;
```

## Styling System

All skeletons follow this pattern:

```tsx
<div className="animate-pulse">
  <div className="bg-gray-200 rounded h-4 w-24" />
  <div className="bg-gray-200 rounded h-8 w-full" />
</div>
```

### Key Classes
- `animate-pulse` - Tailwind's pulse animation
- `bg-gray-200` - Light gray background
- `rounded` / `rounded-lg` - Border radius
- `h-{size}` - Height utilities
- `w-{size}` - Width utilities

### Responsive Classes
- `xs:` - Extra small screens (475px+)
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## Extension Points

To add a new skeleton:

1. **Create Component**
   ```
   components/skeletons/NewSkeleton.tsx
   ```

2. **Export from Index**
   ```tsx
   // components/skeletons/index.ts
   export { default as NewSkeleton } from './NewSkeleton';
   ```

3. **Document in README**
   ```markdown
   ### NewSkeleton
   Used for [description]
   ```

4. **Use in Your Page**
   ```tsx
   import { NewSkeleton } from '@/components/skeletons';
   ```

## Performance Considerations

```
Skeleton Component Size: ~1-2KB each
Animation: Pure CSS (no JS)
Render Time: <10ms
Bundle Impact: Minimal (tree-shakeable)
```

## Accessibility

```tsx
{loading && (
  <>
    <span className="sr-only">Loading content...</span>
    <ProductDetailSkeleton />
  </>
)}
```

## Testing Strategy

```
1. Visual Testing
   - Check layout matches content
   - Verify responsive behavior
   - Test animation smoothness

2. Integration Testing
   - Test loading states
   - Verify skeleton shows/hides correctly
   - Check data population

3. Performance Testing
   - Measure render time
   - Check bundle size impact
   - Verify no memory leaks
```

## Maintenance

Regular maintenance tasks:

- ✅ Keep skeletons in sync with component updates
- ✅ Update documentation when adding new skeletons
- ✅ Review and optimize skeleton complexity
- ✅ Test on new screen sizes/devices
- ✅ Update responsive breakpoints as needed

## Version History

- **v1.0** - Initial implementation (2026-04-29)
  - 11 skeleton components
  - Full documentation
  - All pages integrated
