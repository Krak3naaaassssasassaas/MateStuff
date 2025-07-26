
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, User, ShoppingCart, Menu, LogOut, Settings } from "lucide-react";
import { Icons } from "./icons";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { useCart } from "@/contexts/cart-context";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  const navLinks = [
    { href: "/products", label: t('navShop') },
    { href: "/categories", label: t('navCategories') },
    { href: "/deals", label: t('navDeals') },
  ];

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              MateStuff
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-all duration-200 hover:text-foreground/80 text-foreground/60 hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="font-bold font-headline">MateStuff</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-1 text-lg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="flex-1 hidden md:flex justify-center">
             <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('searchPlaceholder')} className="pl-9" />
             </div>
           </div>
          <LanguageSwitcher />
          <ThemeSwitcher />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t('profile')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('profile')}</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/profile/edit">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t('accountInformation')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('logout')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">{t('profile')}</span>
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItemsInCart > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {totalItemsInCart}
                </Badge>
              )}
              <span className="sr-only">{t('cart')}</span>
            </Link>
          </Button>

          {!user && (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{t('signUp')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
