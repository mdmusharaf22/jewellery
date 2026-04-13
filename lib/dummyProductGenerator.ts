import { Product } from './productData';

// Jewelry categories
const categories = ['necklace', 'earrings', 'bangles', 'rings', 'bracelets', 'pendants', 'chains', 'anklets'];

// Product name templates
const nameTemplates = [
  'Traditional {adjective} {type}',
  '{adjective} {type} Set',
  'Handcrafted {adjective} {type}',
  'Designer {adjective} {type}',
  'Elegant {adjective} {type}',
  'Royal {adjective} {type}',
  'Classic {adjective} {type}',
  'Premium {adjective} {type}',
];

const adjectives = [
  'Temple', 'Antique', 'Bridal', 'Diamond', 'Kundan', 'Polki', 
  'Meenakari', 'Filigree', 'Contemporary', 'Vintage', 'Floral', 'Peacock'
];

const types = [
  'Necklace', 'Choker', 'Jhumka', 'Studs', 'Bangle', 'Kada', 
  'Ring', 'Pendant', 'Chain', 'Anklet', 'Bracelet', 'Earrings'
];

const karats = ['22KT Gold', '18KT Gold', '24KT Gold', '14KT Gold', '999 Silver'];

const occasions = [
  'Bridal, Wedding',
  'Festive, Traditional',
  'Daily Wear, Casual',
  'Party, Celebration',
  'Religious, Ceremonial',
  'Anniversary, Special Occasion'
];

const collections = [
  'Temple Heritage',
  'Antique Collection',
  'Bridal Collection',
  'Diamond Elegance',
  'Contemporary Designs',
  'Traditional Heritage',
  'Royal Collection',
  'Silver Essentials'
];

const metalColors = ['Yellow', 'Rose', 'White', 'Antique Gold', 'Silver'];

// Generate random jewelry images from Unsplash
const jewelryImageIds = [
  'photo-1611591437281-460bfbe1220a', // necklace
  'photo-1599643478518-a784e5dc4c8f', // necklace
  'photo-1515562141207-7a88fb7ce338', // jewelry
  'photo-1617038260897-41a1f14a8ca0', // bangles
  'photo-1535632066927-ab7c9ab60908', // earrings
  'photo-1630019852942-f89202989a59', // earrings
  'photo-1610701596007-11502861dcfa', // silver
  'photo-1611085583191-a3b181a88401', // silver
  'photo-1610375461246-83df859d849d', // gold
  'photo-1611652022419-a9419f74343a', // gold
  'photo-1605100804763-247f67b3557e', // ring
  'photo-1605100804763-247f67b3557e', // ring
];

// Hash function to generate consistent random values from string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Seeded random number generator
function seededRandom(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
}

// Generate dummy product based on ID or slug
export function generateDummyProduct(identifier: string, productName?: string, productPrice?: number, productKarat?: string): Product {
  const hash = hashCode(identifier);
  
  // Use provided name or generate one
  let name = productName;
  if (!name) {
    const adjectiveIndex = seededRandom(hash + 1, 0, adjectives.length - 1);
    const typeIndex = seededRandom(hash + 2, 0, types.length - 1);
    const templateIndex = seededRandom(hash + 3, 0, nameTemplates.length - 1);
    
    name = nameTemplates[templateIndex]
      .replace('{adjective}', adjectives[adjectiveIndex])
      .replace('{type}', types[typeIndex]);
  }
  
  // Use provided karat or generate one
  const karat = productKarat || karats[seededRandom(hash + 4, 0, karats.length - 1)];
  
  // Use provided price or generate one
  let price = productPrice;
  if (!price) {
    const basePrice = seededRandom(hash + 5, 15000, 250000);
    price = Math.round(basePrice / 1000) * 1000; // Round to nearest 1000
  }
  
  // Determine category from name or identifier
  const categoryIndex = seededRandom(hash, 0, categories.length - 1);
  const category = categories[categoryIndex];
  
  // Generate 3-4 images
  const numImages = seededRandom(hash + 6, 3, 4);
  const images: string[] = [];
  for (let i = 0; i < numImages; i++) {
    const imageIndex = seededRandom(hash + 7 + i, 0, jewelryImageIds.length - 1);
    images.push(`https://images.unsplash.com/${jewelryImageIds[imageIndex]}?w=800`);
  }
  
  // Generate purity options based on karat
  const purityOptions = karat.includes('Silver') 
    ? ['999 Silver', '925 Silver']
    : karat.includes('24KT')
    ? ['24KT (999.9)', '22KT (916)']
    : karat.includes('22KT')
    ? ['22KT (916)', '18KT']
    : ['18KT', '14KT'];
  
  // Generate length options based on category or name
  let lengthOptions: string[];
  const nameLower = name.toLowerCase();
  if (nameLower.includes('necklace') || nameLower.includes('chain') || nameLower.includes('choker')) {
    lengthOptions = ['14 inches', '16 inches', '18 inches'];
  } else if (nameLower.includes('bangle') || nameLower.includes('bracelet') || nameLower.includes('kada')) {
    lengthOptions = ['2.4 size', '2.6 size', '2.8 size'];
  } else if (nameLower.includes('ring')) {
    lengthOptions = ['Size 6', 'Size 7', 'Size 8'];
  } else {
    lengthOptions = ['Small', 'Medium', 'Large'];
  }
  
  const occasionIndex = seededRandom(hash + 8, 0, occasions.length - 1);
  const collectionIndex = seededRandom(hash + 9, 0, collections.length - 1);
  const metalColorIndex = seededRandom(hash + 10, 0, metalColors.length - 1);
  
  // Generate product code
  const productCode = `${category.substring(0, 2).toUpperCase()}-${Math.abs(hash).toString().substring(0, 4)}`;
  
  // Determine product type from name
  let productType = 'Jewelry';
  if (nameLower.includes('necklace') || nameLower.includes('choker')) productType = 'Necklace';
  else if (nameLower.includes('earring') || nameLower.includes('jhumka') || nameLower.includes('stud')) productType = 'Earrings';
  else if (nameLower.includes('bangle') || nameLower.includes('kada')) productType = 'Bangle';
  else if (nameLower.includes('ring')) productType = 'Ring';
  else if (nameLower.includes('pendant')) productType = 'Pendant';
  else if (nameLower.includes('bracelet')) productType = 'Bracelet';
  else if (nameLower.includes('chain')) productType = 'Chain';
  
  // Generate weights
  const grossWeight = seededRandom(hash + 11, 80, 700) / 10; // 8.0 to 70.0 grams
  const netWeight = grossWeight * 0.94; // 94% of gross weight
  
  // Calculate price breakup
  const goldValue = Math.round(price * 0.72);
  const makingCharges = Math.round(price * 0.18);
  const gemstoneValue = Math.round(price * 0.06);
  const wastage = Math.round(price * 0.02);
  const gst = Math.round(price * 0.02);
  
  // Generate description
  const descriptions = [
    `Exquisite ${name.toLowerCase()} featuring intricate craftsmanship and traditional design elements. Perfect for special occasions and celebrations.`,
    `Handcrafted ${name.toLowerCase()} showcasing timeless elegance and superior quality. A perfect addition to your jewelry collection.`,
    `Beautiful ${name.toLowerCase()} designed with attention to detail and traditional artistry. Ideal for weddings and festive occasions.`,
    `Stunning ${name.toLowerCase()} that combines classic design with modern aesthetics. Perfect for making a statement.`,
    `Premium ${name.toLowerCase()} crafted with precision and care. An excellent choice for those who appreciate fine jewelry.`,
  ];
  const descriptionIndex = seededRandom(hash + 12, 0, descriptions.length - 1);
  
  return {
    id: Math.abs(hash) % 100000,
    slug: identifier,
    name,
    category,
    price,
    karat,
    description: descriptions[descriptionIndex],
    images,
    purityOptions,
    lengthOptions,
    productInfo: {
      code: productCode,
      type: productType,
      occasion: occasions[occasionIndex],
      collection: collections[collectionIndex],
    },
    metalDimensions: {
      metalColor: metalColors[metalColorIndex],
      purity: purityOptions[0],
      grossWeight: `${grossWeight.toFixed(3)} g`,
      netWeight: `${netWeight.toFixed(3)} g`,
      length: lengthOptions[1] || lengthOptions[0],
    },
    priceBreakup: {
      goldValue,
      makingCharges,
      gemstoneValue,
      wastage,
      gst,
      total: price,
    },
  };
}
