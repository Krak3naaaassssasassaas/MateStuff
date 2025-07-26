
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { useAuth } from './auth-context';

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleItemSelection: (productId: string) => void;
  selectedItemsTotal: number;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getFromStorage = <T,>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage`, error);
        return fallback;
    }
};

const setInStorage = (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const cartStorageKey = user ? `cart_${user.id}` : 'cart_guest';

  useEffect(() => {
    const storedCart = getFromStorage<CartItem[]>(cartStorageKey, []);
    setCartItems(storedCart.map(item => ({ ...item, selected: item.selected ?? true })));
  }, [user, cartStorageKey]);

  useEffect(() => {
    setInStorage(cartStorageKey, cartItems);
  }, [cartItems, cartStorageKey]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, selected: true }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleItemSelection = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const selectedItemsTotal = cartItems
    .filter(item => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, toggleItemSelection, selectedItemsTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
