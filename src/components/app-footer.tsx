
"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { useLanguage } from "@/contexts/language-context";

export function AppFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">{t('aboutUs')}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:underline">{t('ourStory')}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{t('careers')}</Link></li>
              <li><Link href="#" className="text-sm hover:underline">{t('press')}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-headline font-semibold mb-4">{t('customerService')}</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm hover:underline">{t('contactUs')}</Link></li>
              <li><Link href="/faq" className="text-sm hover:underline">{t('faq')}</Link></li>
            </ul>
          </div>
          <div className="md:col-span-1 md:text-left">
            <h3 className="font-headline font-semibold mb-4">{t('followUs')}</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="#" aria-label="Facebook"><Icons.facebook className="h-6 w-6 hover:opacity-80" /></Link>
              <Link href="https://www.instagram.com/andrewseptianmr/profilecard/?igsh=MTFld3k3Y3lpcjI4OA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icons.instagram className="h-6 w-6 hover:opacity-80" /></Link>
              <Link href="#" aria-label="Twitter"><Icons.twitter className="h-6 w-6 hover:opacity-80" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MateStuff. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
