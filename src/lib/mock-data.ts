import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "vintage-leather-jacket",
    name: "Vintage Leather Jacket",
    description: "A classic brown leather jacket from the 80s. In excellent condition with a timeless design.",
    price: 750000,
    image: "https://placehold.co/600x600.png",
    category: "Apparel",
    condition: "vintage",
    size: "L",
    color: "Brown",
    rating: 4.5,
    reviewCount: 34,
    dataAiHint: "vintage leather jacket"
  },
  {
    id: "antique-gold-ring",
    name: "Antique Gold Ring",
    description: "A beautiful gold ring with intricate carvings. A timeless piece of jewelry.",
    price: 1200000,
    image: "https://placehold.co/600x600.png",
    category: "Jewelry",
    condition: "vintage",
    size: "One Size",
    color: "Gold",
    rating: 4.8,
    reviewCount: 21,
    dataAiHint: "antique ring"
  },
  {
    id: "retro-sunglasses",
    name: "Retro Sunglasses",
    description: "Stylish cat-eye sunglasses with a tortoise shell frame. Perfect for a sunny day.",
    price: 250000,
    image: "https://placehold.co/600x600.png",
    category: "Accessories",
    condition: "gently-used",
    size: "One Size",
    color: "Tortoise",
    rating: 4.2,
    reviewCount: 55,
    dataAiHint: "retro sunglasses fashion"
  },
  {
    id: "classic-denim-jeans",
    name: "Classic Denim Jeans",
    description: "A pair of high-quality denim jeans. Comfortable fit and durable material.",
    price: 400000,
    image: "https://placehold.co/600x600.png",
    category: "Apparel",
    condition: "like-new",
    size: "M",
    color: "Blue",
    rating: 4.6,
    reviewCount: 89,
    dataAiHint: "denim jeans"
  },
  {
    id: "silver-pendant-necklace",
    name: "Silver Pendant Necklace",
    description: "A stylish and elegant silver necklace with a unique pendant. A statement piece for your collection.",
    price: 550000,
    image: "https://placehold.co/600x600.png",
    category: "Jewelry",
    condition: "like-new",
    size: "One Size",
    color: "Silver",
    rating: 4.9,
    reviewCount: 15,
    dataAiHint: "pendant necklace"
  },
  {
    id: "preloved-hoodie",
    name: "Preloved Graphic Hoodie",
    description: "A comfy graphic hoodie in great condition. Perfect for a casual look.",
    price: 300000,
    image: "https://placehold.co/600x600.png",
    category: "Apparel",
    condition: "gently-used",
    size: "M",
    color: "Black",
    rating: 4.7,
    reviewCount: 42,
    dataAiHint: "graphic hoodie"
  },
  {
    id: "beaded-bracelet-set",
    name: "Beaded Bracelet Set",
    description: "A set of three colorful beaded bracelets. Adds a bohemian touch to any outfit.",
    price: 150000,
    image: "https://placehold.co/600x600.png",
    category: "Jewelry",
    condition: "like-new",
    size: "One Size",
    color: "Multicolor",
    rating: 4.8,
    reviewCount: 18,
    dataAiHint: "beaded bracelets"
  },
  {
    id: "leather-messenger-bag",
    name: "Leather Messenger Bag",
    description: "A durable and spacious messenger bag made from genuine leather. Perfect for work or travel.",
    price: 650000,
    image: "https://placehold.co/600x600.png",
    category: "Accessories",
    condition: "gently-used",
    size: "One Size",
    color: "Dark Brown",
    rating: 4.6,
    reviewCount: 63,
    dataAiHint: "messenger bag"
  }
];

export const categories = [
  { name: 'Pakaian', slug: 'apparel', image: 'https://placehold.co/600x400.png', dataAiHint: 'fashion clothes', description: 'Koleksi pakaian pria, wanita, dan unisex.' },
  { name: 'Perhiasan', slug: 'jewelry', image: 'https://placehold.co/600x400.png', dataAiHint: 'jewelry collection', description: 'Cincin, kalung, gelang, dan lainnya.' },
  { name: 'Aksesoris', slug: 'accessories', image: 'https://placehold.co/600x400.png', dataAiHint: 'fashion accessories', description: 'Tas, kacamata, dan pernak-pernik unik.' },
];
