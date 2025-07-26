
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag, LogIn } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { Checkbox } from "@/components/ui/checkbox";

function formatRupiah(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, selectedItemsTotal, toggleItemSelection } = useCart();

  const renderEmptyCartOrLogin = () => {
    if (!user) {
      return (
        <div className="text-center py-20 text-muted-foreground flex flex-col items-center justify-center">
            <LogIn className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('cartLoginPromptTitle')}</h3>
            <p className="mb-6">{t('cartLoginPromptSubtitle')}</p>
            <Button asChild>
                <Link href="/login">{t('login')}</Link>
            </Button>
        </div>
      );
    }
    return (
      <div className="text-center py-20 text-muted-foreground flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('cartEmptyTitle')}</h3>
          <p className="mb-6">{t('cartEmptySubtitle')}</p>
          <Button asChild>
              <Link href="/products">{t('startShopping')}</Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('cart')}</h1>
        {user && <p className="mt-2 text-lg text-muted-foreground">
            {t('cartSubtitle', { count: cartItems.length })}
        </p>}
      </div>

      {cartItems.length === 0 || !user ? (
        renderEmptyCartOrLogin()
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <Checkbox
                  checked={item.selected}
                  onCheckedChange={() => toggleItemSelection(item.id)}
                  aria-label={`Select ${item.name}`}
                  className="mr-4"
                />
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover aspect-square"
                  data-ai-hint={item.dataAiHint}
                />
                <div className="ml-4 flex-grow">
                  <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{t(item.category.toLowerCase() as any)}</p>
                  <p className="text-sm font-semibold mt-1">{formatRupiah(item.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 text-center"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                    </Button>
                </div>
              </Card>
            ))}
          </div>

          <aside className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>{t('orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>{formatRupiah(selectedItemsTotal)}</span>
                </div>
                 <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span>{t('calculatedAtCheckout')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('total')}</span>
                  <span>{formatRupiah(selectedItemsTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" size="lg">{t('checkout')}</Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
