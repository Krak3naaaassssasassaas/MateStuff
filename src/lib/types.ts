
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Apparel' | 'Jewelry' | 'Accessories' | string; // Allow for other strings but suggest these
  condition: 'like-new' | 'gently-used' | 'vintage'| 'likeNew' | 'gentlyUsed'; 
  size?: 'S' | 'M' | 'L' | 'XL' | 'One Size';
  color?: string;
  rating: number;
  reviewCount: number;
  dataAiHint: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string; // Should be handled securely, not stored plaintext
  joined: string;
  dob?: string;
  phone?: string;
  photo?: string; // a base64 string for the image
  followers: string[]; // array of user IDs
  following: string[]; // array of user IDs
};
