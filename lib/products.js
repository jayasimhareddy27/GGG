export const PRODUCTS = [
  {
    id: '1',
    slug: 'men-whipped-body-butter',
    name: 'Handcrafted Body Butter (Men)',
    category: [ 'Body Butters', 'men'],
    price: 15.00,
    image: '/men-body-butter.jpeg', // Black Jar
    shortDescription: '10-12 hours of deep moisture in a sleek black jar. Handcrafted with Shea & Mango butter.',
    fullDescription: 'Handmade personally with rich Shea and Mango butter, blended with pure Jojoba, Coconut, Apricot, or Vitamin E oils, and enriched with essential oils. Delivers 10-12 hours of deep hydration without leaving a greasy residue.',
    ingredients: ['Shea Butter', 'Mango Butter', 'Jojoba Oil', 'Coconut Oil', 'Apricot Oil', 'Vitamin E', 'Essential Oils'],
variants: [
      { name: '4 oz', price: 15.00 },
      { name: '8 oz', price: 25.00 },
      { name: '5 oz', price: 18.00 },
      { name: '2 oz (Purse Size)', price: 1.00 }
    ],    containerStyle: 'Black Jar'
  },
  {
    id: '2',
    slug: 'women-whipped-body-butter',
    name: 'Handcrafted Body Butter (Women)',
    category: [ 'Body Butters', 'women'],
    price: 12.00,
    image: '/women-body-butter.jpeg', // Clear Jar
    shortDescription: '10-12 hours of deep moisture in a clear glass jar with gold lid. Available in 3 convenient sizes.',
    fullDescription: 'Handmade personally with rich Shea and Mango butter, blended with pure Jojoba, Coconut, Apricot, or Vitamin E oils, and enriched with essential oils. Delivers 10-12 hours of deep hydration to keep skin soft and glowing all day.',
    ingredients: ['Shea Butter', 'Mango Butter', 'Jojoba Oil', 'Coconut Oil', 'Apricot Oil', 'Vitamin E', 'Essential Oils'],
    variants: [
      { name: '8 oz', price: 20.00 },
      { name: '5 oz', price: 15.00 },
      { name: '2 oz (Purse Size)', price: 8.00 }
    ],    containerStyle: 'Clear Jar'
  }
];