
import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/contexts/language-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { CartProvider } from "@/contexts/cart-context";

export const metadata: Metadata = {
  title: "MateStuff",
  description: "Your one-stop shop for quality preloved items.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,700;1,7..72,400;1,7..72,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-body antialiased flex flex-col"
        )}
      >
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <CartProvider>
                <AppHeader />
                <main className="flex-1">{children}</main>
                <AppFooter />
                <Toaster />
              </CartProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
