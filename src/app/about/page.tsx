
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/language-context";

export default function AboutPage() {
    const { t } = useLanguage();

    const teamMembers = [
      {
        name: "Andrew Septian",
        role: t('founderCEO'),
        image: "https://placehold.co/100x100.png",
        dataAiHint: "man portrait",
        fallback: "AS",
      },
      {
        name: "Jane Doe",
        role: t('headOfCuration'),
        image: "https://placehold.co/100x100.png",
        dataAiHint: "woman portrait",
        fallback: "JD",
      },
      {
        name: "John Smith",
        role: t('leadDeveloper'),
        image: "https://placehold.co/100x100.png",
        dataAiHint: "person portrait",
        fallback: "JS",
      },
    ];

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground tracking-tight">
          {t('ourStory')}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          {t('ourStoryText')}
        </p>
      </section>

      <section className="mb-16">
        <Image
          src="https://placehold.co/1200x600.png"
          alt="A curated collection of vintage items"
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full aspect-[2/1] shadow-lg"
          data-ai-hint="vintage items collection"
        />
      </section>

      <section className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold mb-4">{t('ourMission')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('ourMissionText')}
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-headline font-bold mb-4">{t('ourVision')}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('ourVisionText')}
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-headline font-bold mb-10">{t('meetTheTeam')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-0 shadow-none text-center">
                <CardContent className="flex flex-col items-center p-4">
                     <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                        <AvatarFallback>{member.fallback}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-headline font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
