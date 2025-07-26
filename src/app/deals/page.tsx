
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { Tag } from "lucide-react";

export default function DealsPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('dealsTitle')}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{t('dealsSubtitle')}</p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('dealsComingSoonTitle')}</CardTitle>
          <CardDescription>
            {t('dealsComingSoonDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 text-muted-foreground flex flex-col items-center justify-center">
            <Tag className="h-16 w-16 mb-4" />
            <p className="text-lg mb-4">{t('greatDealsComingSoon')}</p>
            <Button asChild variant="secondary">
              <a href="/products">{t('exploreProducts')}</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
