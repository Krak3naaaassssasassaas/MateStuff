
"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { products as mockProducts } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import type { Product, User } from "@/lib/types";

export default function ProductsPage() {
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


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('allProductsTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('allProductsSubtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-lg font-headline font-semibold mb-4">{t('filters')}</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">{t('search')}</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('keyword')} className="pl-9" />
              </div>
            </div>
            <div>
              <label htmlFor="category-select" className="text-sm font-medium">{t('category')}</label>
              <Select>
                <SelectTrigger id="category-select" className="mt-1">
                  <SelectValue placeholder={t('allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allCategories')}</SelectItem>
                  <SelectItem value="apparel">{t('apparel')}</SelectItem>
                  <SelectItem value="jewelry">{t('jewelry')}</SelectItem>
                  <SelectItem value="accessories">{t('accessories')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="size-select" className="text-sm font-medium">{t('size')}</label>
              <Select>
                <SelectTrigger id="size-select" className="mt-1">
                  <SelectValue placeholder={t('allSizes')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allSizes')}</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  <SelectItem value="one-size">One Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <label htmlFor="condition-select" className="text-sm font-medium">{t('condition')}</label>
              <Select>
                <SelectTrigger id="condition-select" className="mt-1">
                  <SelectValue placeholder={t('allConditions')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allConditions')}</SelectItem>
                  <SelectItem value="like-new">{t('vintage')}</SelectItem>
                  <SelectItem value="gently-used">{t('vintage')}</SelectItem>
                  <SelectItem value="vintage">{t('vintage')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <label htmlFor="price-range" className="text-sm font-medium">{t('priceRange')}</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" placeholder={t('minPrice')} />
                <span>-</span>
                <Input type="number" placeholder={t('maxPrice')} />
              </div>
            </div>
          </div>
        </aside>

        <Separator orientation="vertical" className="hidden md:block h-auto" />

        {/* Product Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex justify-between items-center mb-4">
             <p className="text-sm text-muted-foreground">{t('showingResults').replace('{count}', allProducts.length.toString())}</p>
            <Select>
              <SelectTrigger className="w-auto md:w-[200px]">
                <SelectValue placeholder={`${t('sortBy')} ${t('featured')}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">{t('featured')}</SelectItem>
                <SelectItem value="price-asc">{t('priceAsc')}</SelectItem>
                <SelectItem value="price-desc">{t('priceDesc')}</SelectItem>
                <SelectItem value="newest">{t('newest')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
