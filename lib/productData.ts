// Product data structure
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  karat: string;
  description: string;
  images: string[];
  purityOptions: string[];
  lengthOptions: string[];
  productInfo: {
    code: string;
    type: string;
    occasion: string;
    collection: string;
  };
  metalDimensions: {
    metalColor: string;
    purity: string;
    grossWeight: string;
    netWeight: string;
    length: string;
  };
  priceBreakup: {
    goldValue: number;
    makingCharges: number;
    gemstoneValue: number;
    wastage: number;
    gst: number;
    total: number;
  };
}

// Mock product database
export const productsDatabase: Product[] = [
  {
    id: 1,
    slug: 'lakshmi-bridal-choker',
    name: 'Lakshmi Bridal Choker',
    category: 'necklace',
    price: 218000,
    karat: '22KT Gold',
    description: 'An intricately designed temple jewellery choker featuring the goddess Lakshmi motif, complemented by delicate ruby and emerald accents. Handcrafted to perfection, this piece brings a timeless elegance to any bridal ensemble or festive occasion.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['14 inches', '16 inches'],
    productInfo: {
      code: 'NK-BRD-8942',
      type: 'Necklace',
      occasion: 'Bridal, Festive',
      collection: 'Temple Heritage',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '45.500 g',
      netWeight: '42.850 g',
      length: '14 Inches (Adjustable)',
    },
    priceBreakup: {
      goldValue: 178950,
      makingCharges: 25700,
      gemstoneValue: 8650,
      wastage: 2300,
      gst: 2400,
      total: 218000,
    },
  },
  {
    id: 2,
    slug: 'temple-jhumka-pair',
    name: 'Temple Jhumka Pair',
    category: 'gold-jhumkas',
    price: 86500,
    karat: '22KT Gold',
    description: 'Exquisite temple-style jhumka earrings featuring intricate traditional motifs. These handcrafted pieces showcase the finest South Indian jewelry artistry with detailed work and elegant design.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['Medium', 'Large'],
    productInfo: {
      code: 'ER-TMP-6543',
      type: 'Earrings',
      occasion: 'Wedding, Festive',
      collection: 'Temple Heritage',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '24.800 g',
      netWeight: '23.200 g',
      length: 'Medium',
    },
    priceBreakup: {
      goldValue: 68900,
      makingCharges: 12800,
      gemstoneValue: 3200,
      wastage: 900,
      gst: 700,
      total: 86500,
    },
  },
  {
    id: 3,
    slug: 'silver-pooja-gift-set',
    name: 'Silver Pooja Gift Set',
    category: 'all',
    price: 14800,
    karat: '999 Silver',
    description: 'Premium silver pooja gift set including traditional items for religious ceremonies. Made from 999 purity silver, this set is perfect for gifting during festivals and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800',
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    ],
    purityOptions: ['999 Silver'],
    lengthOptions: ['Standard Set'],
    productInfo: {
      code: 'SV-POJ-2341',
      type: 'Silver Set',
      occasion: 'Religious, Gifting',
      collection: 'Silver Essentials',
    },
    metalDimensions: {
      metalColor: 'Silver',
      purity: '999 Silver',
      grossWeight: '185.000 g',
      netWeight: '185.000 g',
      length: 'N/A',
    },
    priceBreakup: {
      goldValue: 0,
      makingCharges: 2800,
      gemstoneValue: 0,
      wastage: 0,
      gst: 12000,
      total: 14800,
    },
  },
  {
    id: 4,
    slug: 'festival-gold-coin',
    name: 'Festival Gold Coin',
    category: 'all',
    price: 39950,
    karat: '24KT Gold',
    description: 'Pure 24KT gold coin featuring traditional designs, perfect for festivals, gifting, and investment. Each coin comes with authenticity certificate and secure packaging.',
    images: [
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
    ],
    purityOptions: ['24KT (999.9)'],
    lengthOptions: ['5g', '10g'],
    productInfo: {
      code: 'GC-FST-1234',
      type: 'Gold Coin',
      occasion: 'Festival, Investment',
      collection: 'Gold Coins',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '24KT (999.9)',
      grossWeight: '10.000 g',
      netWeight: '10.000 g',
      length: 'N/A',
    },
    priceBreakup: {
      goldValue: 38500,
      makingCharges: 1200,
      gemstoneValue: 0,
      wastage: 0,
      gst: 250,
      total: 39950,
    },
  },
  {
    id: 5,
    slug: 'diamond-pendant-set',
    name: 'Diamond Pendant Set',
    category: 'necklace',
    price: 145000,
    karat: '18KT Gold',
    description: 'Elegant diamond pendant set in 18KT gold featuring brilliant-cut diamonds. This contemporary design combines traditional craftsmanship with modern aesthetics.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    purityOptions: ['18KT', '22KT (916)'],
    lengthOptions: ['16 inches', '18 inches'],
    productInfo: {
      code: 'NK-DIA-4521',
      type: 'Necklace',
      occasion: 'Party, Daily Wear',
      collection: 'Diamond Elegance',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '18KT',
      grossWeight: '32.500 g',
      netWeight: '30.800 g',
      length: '16 Inches',
    },
    priceBreakup: {
      goldValue: 98600,
      makingCharges: 22400,
      gemstoneValue: 18500,
      wastage: 2800,
      gst: 2700,
      total: 145000,
    },
  },
  {
    id: 6,
    slug: 'antique-bangle-set',
    name: 'Antique Bangle Set',
    category: 'bangles',
    price: 95000,
    karat: '22KT Gold',
    description: 'Traditional antique-finish bangle set with intricate engravings and temple motifs. This set of two bangles showcases timeless South Indian jewelry craftsmanship.',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['2.4 size', '2.6 size', '2.8 size'],
    productInfo: {
      code: 'BG-ANT-7823',
      type: 'Bangle',
      occasion: 'Wedding, Traditional',
      collection: 'Antique Collection',
    },
    metalDimensions: {
      metalColor: 'Antique Gold',
      purity: '22KT (916)',
      grossWeight: '52.000 g',
      netWeight: '49.500 g',
      length: '2.6 Size',
    },
    priceBreakup: {
      goldValue: 74200,
      makingCharges: 14800,
      gemstoneValue: 3500,
      wastage: 1600,
      gst: 900,
      total: 95000,
    },
  },
  {
    id: 7,
    slug: 'bridal-necklace-set',
    name: 'Bridal Necklace Set',
    category: 'Bridal',
    price: 218000,
    karat: '22KT Gold',
    description: 'Magnificent bridal necklace set featuring traditional South Indian design with ruby and emerald embellishments. Complete with matching earrings for the perfect bridal look.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    purityOptions: ['22KT (916)'],
    lengthOptions: ['Standard'],
    productInfo: {
      code: 'NK-BRD-9876',
      type: 'Necklace Set',
      occasion: 'Bridal, Wedding',
      collection: 'Bridal Collection',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '68.500 g',
      netWeight: '65.200 g',
      length: 'Standard',
    },
    priceBreakup: {
      goldValue: 172800,
      makingCharges: 28500,
      gemstoneValue: 12400,
      wastage: 2700,
      gst: 1600,
      total: 218000,
    },
  },
  {
    id: 8,
    slug: 'gold-jhumka',
    name: 'Gold Jhumka',
    category: 'Gold',
    price: 86500,
    karat: '22KT Gold',
    description: 'Classic gold jhumka earrings with pearl drops and intricate detailing. Perfect for traditional occasions and festive celebrations.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['Medium', 'Large'],
    productInfo: {
      code: 'ER-JHM-5432',
      type: 'Earrings',
      occasion: 'Festive, Wedding',
      collection: 'Traditional Heritage',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '22.800 g',
      netWeight: '21.200 g',
      length: 'Medium',
    },
    priceBreakup: {
      goldValue: 67200,
      makingCharges: 13800,
      gemstoneValue: 3900,
      wastage: 1000,
      gst: 600,
      total: 86500,
    },
  },
  {
    id: 9,
    slug: 'silver-bowl-set',
    name: 'Silver Bowl Set',
    category: 'Silver',
    price: 14800,
    karat: '999 Silver',
    description: 'Premium silver bowl set perfect for religious ceremonies and gifting. Made from 999 purity silver with traditional designs.',
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    ],
    purityOptions: ['999 Silver'],
    lengthOptions: ['Standard Set'],
    productInfo: {
      code: 'SV-BWL-3456',
      type: 'Silver Set',
      occasion: 'Religious, Gifting',
      collection: 'Silver Essentials',
    },
    metalDimensions: {
      metalColor: 'Silver',
      purity: '999 Silver',
      grossWeight: '195.000 g',
      netWeight: '195.000 g',
      length: 'N/A',
    },
    priceBreakup: {
      goldValue: 0,
      makingCharges: 2900,
      gemstoneValue: 0,
      wastage: 0,
      gst: 11900,
      total: 14800,
    },
  },
  {
    id: 10,
    slug: 'gold-bangle',
    name: 'Gold Bangle',
    category: 'Gold',
    price: 39950,
    karat: '24KT Gold',
    description: 'Elegant 24KT gold bangle with smooth finish. Perfect for daily wear or special occasions, combining simplicity with luxury.',
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    ],
    purityOptions: ['24KT (999.9)', '22KT (916)'],
    lengthOptions: ['2.4 size', '2.6 size', '2.8 size'],
    productInfo: {
      code: 'BG-GLD-6789',
      type: 'Bangle',
      occasion: 'Daily Wear, Party',
      collection: 'Gold Essentials',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '24KT (999.9)',
      grossWeight: '12.500 g',
      netWeight: '12.500 g',
      length: '2.6 Size',
    },
    priceBreakup: {
      goldValue: 37800,
      makingCharges: 1800,
      gemstoneValue: 0,
      wastage: 150,
      gst: 200,
      total: 39950,
    },
  },
  {
    id: 3,
    slug: 'diamond-studded-bangle',
    name: 'Diamond Studded Bangle',
    category: 'bangles',
    price: 125000,
    karat: '18KT Gold',
    description: 'Elegant diamond-studded bangles crafted in 18KT gold. Perfect for daily wear or special occasions, these bangles add a touch of sophistication to any outfit.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    purityOptions: ['18KT', '22KT (916)'],
    lengthOptions: ['2.4 size', '2.6 size', '2.8 size'],
    productInfo: {
      code: 'BG-DIA-5632',
      type: 'Bangle',
      occasion: 'Daily Wear, Party',
      collection: 'Diamond Elegance',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '18KT',
      grossWeight: '28.500 g',
      netWeight: '26.800 g',
      length: '2.6 Size',
    },
    priceBreakup: {
      goldValue: 89600,
      makingCharges: 18500,
      gemstoneValue: 12400,
      wastage: 1800,
      gst: 2700,
      total: 125000,
    },
  },
  {
    id: 4,
    slug: 'traditional-jhumka-earrings',
    name: 'Traditional Jhumka Earrings',
    category: 'earrings',
    price: 45000,
    karat: '22KT Gold',
    description: 'Classic jhumka earrings with intricate detailing and pearl drops. These timeless pieces are perfect for traditional occasions and festive celebrations.',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    purityOptions: ['22KT (916)', '18KT'],
    lengthOptions: ['Medium', 'Large'],
    productInfo: {
      code: 'ER-JHM-3421',
      type: 'Earrings',
      occasion: 'Festive, Wedding',
      collection: 'Traditional Heritage',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '12.800 g',
      netWeight: '11.900 g',
      length: 'Medium',
    },
    priceBreakup: {
      goldValue: 35700,
      makingCharges: 6400,
      gemstoneValue: 1800,
      wastage: 600,
      gst: 500,
      total: 45000,
    },
  },
  {
    id: 5,
    slug: 'kundan-maang-tikka',
    name: 'Kundan Maang Tikka',
    category: 'maang-tikka',
    price: 32000,
    karat: '22KT Gold',
    description: 'Exquisite kundan maang tikka with traditional design. A perfect bridal accessory that adds grace and elegance to your wedding ensemble.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    purityOptions: ['22KT (916)'],
    lengthOptions: ['Standard'],
    productInfo: {
      code: 'MT-KND-2156',
      type: 'Maang Tikka',
      occasion: 'Bridal, Wedding',
      collection: 'Kundan Collection',
    },
    metalDimensions: {
      metalColor: 'Yellow',
      purity: '22KT (916)',
      grossWeight: '8.200 g',
      netWeight: '7.600 g',
      length: 'Standard',
    },
    priceBreakup: {
      goldValue: 24800,
      makingCharges: 4800,
      gemstoneValue: 1600,
      wastage: 400,
      gst: 400,
      total: 32000,
    },
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return productsDatabase.find(p => p.id === parseInt(id));
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return productsDatabase.find(p => p.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return productsDatabase.filter(p => p.category === category);
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return productsDatabase;
}
