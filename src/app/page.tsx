
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products as mockProducts } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import type { Product, User } from "@/lib/types";

export default function Home() {
  const { t } = useLanguage();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    let userProducts: Product[] = [];
    users.forEach(user => {
      const products = JSON.parse(localStorage.getItem(`products_${user.id}`) || '[]') as Product[];
      userProducts = userProducts.concat(products);
    });
    // Combine mock products with user-uploaded products, preventing duplicates
    const combinedProducts = [...mockProducts, ...userProducts];
    const uniqueProducts = Array.from(new Map(combinedProducts.map(p => [p.id, p])).values());
    setAllProducts(uniqueProducts);
  }, []);

  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="bg-black text-white py-24 sm:py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold lowercase tracking-tighter">
            {t('heroTitle')}
          </h1>
          <div className="flex justify-center items-center my-6">
              <div className="h-px w-16 bg-white/20"></div>
          </div>
          <p className="font-headline italic text-xl md:text-2xl text-white/80">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">{t('startShopping')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-headline font-bold tracking-tight">
              {t('featuredItems')}
            </h2>
            <Button variant="link" asChild>
              <Link href="/products">
                {t('viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
