
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart } from "lucide-react";
import { products as mockProducts } from "@/lib/mock-data";
import { useLanguage } from "@/contexts/language-context";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product, User } from "@/lib/types";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

function formatRupiah(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!params.id) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    let userProducts: Product[] = [];
    users.forEach(user => {
      const products = JSON.parse(localStorage.getItem(`products_${user.id}`) || '[]') as Product[];
      userProducts = userProducts.concat(products);
    });
    
    const combinedProducts = [...mockProducts, ...userProducts];
    const uniqueProducts = Array.from(new Map(combinedProducts.map(p => [p.id, p])).values());
    
    const foundProduct = uniqueProducts.find(p => p.id === params.id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push('/products');
    }
    setLoading(false);
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>{t('productNotFound')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
            data-ai-hint={product.dataAiHint}
          />
        </div>

        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{t(product.category.toLowerCase() as any) || product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.name}</h1>
            <p className="text-2xl mt-2 font-semibold text-primary">{formatRupiah(product.price)}</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span>{product.rating.toFixed(1)} ({product.reviewCount} {t('reviews')})</span>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-semibold mb-2">{t('aboutThisItem')}</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
             <div>
                <p className="font-semibold">{t('condition')}</p>
                <p className="text-muted-foreground">{t(product.condition as any)}</p>
            </div>
            {product.size && (
                <div>
                    <p className="font-semibold">{t('size')}</p>
                    <p className="text-muted-foreground">{product.size}</p>
                </div>
            )}
             {product.color && (
                <div>
                    <p className="font-semibold">{t('color')}</p>
                    <p className="text-muted-foreground">{product.color}</p>
                </div>
            )}
          </div>
          
          <Separator />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">
              {t('buyNow')}
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('addToCart')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
