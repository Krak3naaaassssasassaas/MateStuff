
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { User, Product } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, username: string, email: string, password: string) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  userProducts: Product[];
  addUserProduct: (product: Product) => void;
  deleteUserProduct: (productId: string) => void;
  getUserByUsername: (username: string) => User | undefined;
  toggleFollow: (userIdToFollow: string) => void;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get data from localStorage
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


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProducts, setUserProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedUsers = getFromStorage<User[]>('users', []);
    setAllUsers(storedUsers.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword as User;
    }));

    const storedUser = getFromStorage<User | null>('user', null);
    if (storedUser) {
        const fullUser = storedUsers.find(u => u.id === storedUser.id);
        if (fullUser) {
            const { password, ...userWithoutPassword } = fullUser;
            setUser(userWithoutPassword as User);
            const storedProducts = getFromStorage<Product[]>(`products_${fullUser.id}`, []);
            setUserProducts(storedProducts);
        }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const storedUsers = getFromStorage<User[]>('users', []);
    const foundUser = storedUsers.find(
      (u: User) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userToSave } = foundUser;
      setUser(userToSave as User);
      setInStorage('user', userToSave);
      
      const storedProducts = getFromStorage<Product[]>(`products_${foundUser.id}`, []);
      setUserProducts(storedProducts);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
    setUserProducts([]);
    localStorage.removeItem('user');
  };

  const signup = (name: string, username: string, email: string, password: string) => {
    const storedUsers = getFromStorage<User[]>('users', []);
    const userExists = storedUsers.some((u: User) => u.email === email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    const usernameExists = storedUsers.some((u: User) => u.username === username);
    if (usernameExists) {
      throw new Error('This username is already taken');
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      username,
      email,
      password, // In a real app, this should be hashed
      joined: new Date().toISOString(),
      followers: [],
      following: [],
    };
    
    const updatedUsers = [...storedUsers, newUser];
    setInStorage('users', updatedUsers);
    setAllUsers(updatedUsers.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword as User;
    }));
  };

  const updateUser = useCallback((updatedUserData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;

      const newUser = { ...prevUser, ...updatedUserData };
      
      setInStorage('user', newUser);

      const storedUsers = getFromStorage<User[]>('users', []);
      const userIndex = storedUsers.findIndex(u => u.id === prevUser.id);
      if (userIndex > -1) {
        const userWithPassword = storedUsers[userIndex];
        const updatedUserInList = { ...userWithPassword, ...newUser };
        storedUsers[userIndex] = updatedUserInList;
        setInStorage('users', storedUsers);
        setAllUsers(storedUsers.map(u => {
            const { password, ...userWithoutPassword } = u;
            return userWithoutPassword as User;
        }));
      }
      
      return newUser;
    });
  }, []);

  const addUserProduct = useCallback((product: Product) => {
    if (!user) return;
    const updatedProducts = [...userProducts, product];
    setUserProducts(updatedProducts);
    setInStorage(`products_${user.id}`, updatedProducts);
  }, [user, userProducts]);

  const deleteUserProduct = useCallback((productId: string) => {
    if (!user) return;
    const updatedProducts = userProducts.filter(p => p.id !== productId);
    setUserProducts(updatedProducts);
    setInStorage(`products_${user.id}`, updatedProducts);
  }, [user, userProducts]);

  const getUserByUsername = (username: string) => {
    const storedUsers = getFromStorage<User[]>('users', []);
    const foundUser = storedUsers.find(u => u.username === username);
    if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        return userWithoutPassword as User;
    }
    return undefined;
  };
  
  const toggleFollow = (userIdToFollow: string) => {
    if (!user) return;

    let users = getFromStorage<User[]>('users', []);
    const currentUserIndex = users.findIndex(u => u.id === user.id);
    const targetUserIndex = users.findIndex(u => u.id === userIdToFollow);

    if (currentUserIndex === -1 || targetUserIndex === -1) return;

    const currentUser = users[currentUserIndex];
    const targetUser = users[targetUserIndex];

    const isFollowing = currentUser.following.includes(userIdToFollow);

    if (isFollowing) {
        currentUser.following = currentUser.following.filter(id => id !== userIdToFollow);
        targetUser.followers = targetUser.followers.filter(id => id !== currentUser.id);
    } else {
        currentUser.following.push(userIdToFollow);
        targetUser.followers.push(currentUser.id);
    }
    
    users[currentUserIndex] = currentUser;
    users[targetUserIndex] = targetUser;
    
    setInStorage('users', users);
    
    const { password, ...updatedUserWithoutPassword } = currentUser;
    setUser(updatedUserWithoutPassword as User);
    setInStorage('user', updatedUserWithoutPassword);

    setAllUsers(users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword as User;
    }));
  };
  
  const getAllUsers = () => {
    return allUsers;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, updateUser, userProducts, addUserProduct, deleteUserProduct, getUserByUsername, toggleFollow, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
