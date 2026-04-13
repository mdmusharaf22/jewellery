# Product Data Guide

## Overview
The product detail page now dynamically renders data based on the clicked product's information. It uses a smart system that:
1. First checks if the product exists in the database (`lib/productData.ts`)
2. If not found, uses the product name, price, and karat from the URL parameters
3. Generates complete product details including images, specifications, and price breakup

## How It Works

### URL Structure
When you click a product card, the URL includes the product information:
```
/[category]/[slug]?name=Diamond+Pendant+Set&price=145000&karat=18KT+Gold
```

### Data Flow
1. User clicks on a product card (e.g., "Diamond Pendant Set" for ₹1,45,000)
2. ProductCard creates a URL with the product name, price, and karat as query parameters
3. Product detail page extracts these parameters
4. If product exists in database → uses real data
5. If NOT in database → generates dummy data using the actual name and price from the card
6. Displays complete product page with:
   - The exact name from the card
   - The exact price from the card
   - The exact karat from the card
   - Generated images (3-4 jewelry photos)
   - Generated specifications
   - Generated price breakup

### Key Features

1. **Exact Name & Price**: The product detail page shows exactly what was on the card
2. **Smart Category Detection**: Determines product type from the name (necklace, earrings, bangles, etc.)
3. **Appropriate Length Options**: 
   - Necklaces get "14 inches, 16 inches, 18 inches"
   - Bangles get "2.4 size, 2.6 size, 2.8 size"
   - Rings get "Size 6, Size 7, Size 8"
4. **Realistic Price Breakup**: Calculates gold value, making charges, gemstone value, etc.
5. **Consistent Images**: Same product always shows same images

## Example

If you have a product card showing:
- Name: "Temple Necklace"
- Price: ₹1,85,000
- Karat: 22KT Gold

The detail page will show:
- Name: "Temple Necklace" (exact match)
- Price: ₹1,85,000 (exact match)
- Karat: 22KT Gold (exact match)
- Plus: Images, description, specifications, price breakup

## Testing

Click any product from:
- Homepage Popular Picks
- New Arrivals section
- Product listing pages

The detail page will show the exact product information with complete details!

## Adding New Products

To add a new product, edit `lib/productData.ts` and add a new object to the `productsDatabase` array:

```typescript
{
  id: 6, // Unique numeric ID
  slug: 'product-url-slug', // URL-friendly slug
  name: 'Product Display Name',
  category: 'category-slug', // e.g., 'necklace', 'bangles', 'earrings'
  price: 100000, // Price in rupees
  karat: '22KT Gold',
  description: 'Detailed product description...',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    // Add 2-4 images
  ],
  purityOptions: ['22KT (916)', '18KT'],
  lengthOptions: ['14 inches', '16 inches'],
  productInfo: {
    code: 'PROD-CODE-123',
    type: 'Product Type',
    occasion: 'Occasion1, Occasion2',
    collection: 'Collection Name',
  },
  metalDimensions: {
    metalColor: 'Yellow',
    purity: '22KT (916)',
    grossWeight: '45.500 g',
    netWeight: '42.850 g',
    length: '14 Inches',
  },
  priceBreakup: {
    goldValue: 80000,
    makingCharges: 15000,
    gemstoneValue: 3000,
    wastage: 1000,
    gst: 1000,
    total: 100000, // Should match the price field
  },
}
```

## Features

### Dynamic Image Gallery
- Displays all images from the `images` array
- Auto-swipes every 4 seconds
- Hover to zoom functionality
- Thumbnail navigation

### Dynamic Product Information
- Product name, category, and price
- Customizable purity and length options
- Add to cart functionality
- Product details and specifications
- Price breakup

### Loading States
- Shows loading spinner while fetching product
- Handles product not found scenarios

## Future Enhancements

To connect to a real API:
1. Replace the `useEffect` in `app/[category]/[id]/page.tsx`
2. Call your API endpoint: `fetch(\`/api/products/\${id}\`)`
3. Update the state with the API response
4. Keep the same Product interface structure
