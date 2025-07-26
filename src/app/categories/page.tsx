
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { categories } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('categoriesTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('categoriesSubtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link href={`/products?category=${category.slug}`} key={category.slug}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group">
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={category.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-2xl mb-2">{category.name}</CardTitle>
                <CardDescription className="flex-grow">{category.description}</CardDescription>
                <div className="mt-4 flex items-center text-primary font-semibold">
                  <span>{t('navShop')} {category.name}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
