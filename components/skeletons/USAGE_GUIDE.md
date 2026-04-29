# Skeleton Loading - Quick Usage Guide

## Quick Start

### 1. Import the skeleton you need
```tsx
import { ProductDetailSkeleton, CartSkeleton } from '@/components/skeletons';
```

### 2. Use it in your loading state
```tsx
if (loading) {
  return <ProductDetailSkeleton />;
}
```

## Common Patterns

### Pattern 1: Page with Header/Footer
```tsx
if (loading) {
  return (
    <>
      <Header />
      <ProductDetailSkeleton />
      <Footer />
    </>
  );
}
```

### Pattern 2: Component-level Loading
```tsx
export default function ProductList() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }
  
  return <div>...actual content...</div>;
}
```

### Pattern 3: Conditional Section Loading
```tsx
<div>
  <h2>My Profile</h2>
  {isLoadingProfile ? (
    <ProfileSkeleton />
  ) : (
    <ProfileForm data={profileData} />
  )}
</div>
```

### Pattern 4: Dynamic Import (Code Splitting)
```tsx
if (loading) {
  const Skeleton = require('@/components/skeletons/ProductDetailSkeleton').default;
  return <Skeleton />;
}
```

## Skeleton Reference

| Skeleton | Use Case | Props |
|----------|----------|-------|
| `ProductCardSkeleton` | Single product card | None |
| `ProductGridSkeleton` | Product grid/list | `count?: number` |
| `ProductCarouselSkeleton` | Product carousel | `title?: string, subtitle?: string` |
| `ProductDetailSkeleton` | Product detail page | None |
| `CartSkeleton` | Shopping cart page | None |
| `CheckoutSkeleton` | Checkout page | None |
| `ProfileSkeleton` | User profile form | None |
| `WishlistSkeleton` | Wishlist grid | None |
| `PageSkeleton` | Generic page load | None |
| `SkeletonElement` | Custom skeleton builder | `width?, height?, variant?` |

## Building Custom Skeletons

Use `SkeletonElement` for quick custom skeletons:

```tsx
import { SkeletonElement } from '@/components/skeletons';

export default function CustomSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonElement variant="text" width="w-48" height="h-6" />
      <SkeletonElement variant="rectangular" width="w-full" height="h-40" />
      <SkeletonElement variant="circular" width="w-12" height="h-12" />
    </div>
  );
}
```

## Best Practices

### ✅ DO
- Match skeleton layout to actual content
- Use skeletons for all async data loading
- Keep skeletons simple and lightweight
- Show skeletons immediately on page load
- Use consistent skeleton components across the app

### ❌ DON'T
- Don't show skeletons for less than 200ms (too fast)
- Don't make skeletons too detailed (keep it simple)
- Don't use different skeleton styles in the same app
- Don't forget to handle error states separately
- Don't show skeletons indefinitely (add timeout/error handling)

## Examples by Page

### Home Page
```tsx
// In ProductCarousel.tsx
if (loading) {
  return <ProductCarouselSkeleton title={title} subtitle={subtitle} />;
}
```

### Product Detail Page
```tsx
// In app/p/details/[slug]/page.tsx
if (loading) {
  return (
    <>
      <Header />
      <ProductDetailSkeleton />
      <Footer />
    </>
  );
}
```

### Cart Page
```tsx
// In app/cart/page.tsx
{loading ? (
  <CartSkeleton />
) : items.length === 0 ? (
  <EmptyCart />
) : (
  <CartItems items={items} />
)}
```

### Account Page
```tsx
// In app/my-account/page.tsx
if (!isAuthChecked) {
  return (
    <>
      <Header />
      <PageSkeleton />
      <Footer />
    </>
  );
}

// Later in the component
{isLoadingProfile ? (
  <ProfileSkeleton />
) : (
  <ProfileForm />
)}
```

## Troubleshooting

### Skeleton not showing?
- Check if loading state is properly set to `true`
- Verify the import path is correct
- Ensure the component is rendered in the correct place

### Skeleton layout doesn't match content?
- Update the skeleton component to match your layout
- Check responsive classes (xs, sm, md, lg, xl)
- Verify spacing and sizing matches actual content

### Skeleton shows too long?
- Check your data fetching logic
- Add error handling and timeouts
- Consider showing error state after X seconds

### Performance issues?
- Skeletons should be lightweight by design
- Check if you're rendering too many skeleton elements
- Consider lazy loading for off-screen content

## Animation Customization

All skeletons use Tailwind's `animate-pulse`. To customize:

```tsx
// In your skeleton component
<div className="animate-pulse">
  {/* skeleton elements */}
</div>

// Or create custom animation in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        skeleton: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    }
  }
}
```

## Testing Skeletons

To test skeletons in development:

```tsx
// Add artificial delay
useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    fetchData().then(() => setLoading(false));
  }, 2000); // 2 second delay to see skeleton
}, []);
```

## Accessibility

Skeletons are visual indicators. For screen readers, consider:

```tsx
{loading && (
  <>
    <span className="sr-only">Loading content...</span>
    <ProductDetailSkeleton />
  </>
)}
```

## Need Help?

- Check the main README.md in this directory
- Review existing skeleton implementations
- Look at the page examples in the codebase
- Create a new skeleton based on existing patterns
