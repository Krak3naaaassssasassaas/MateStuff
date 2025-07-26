
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSend = () => {
    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const mailtoLink = `mailto:MateStuff.preloved@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setSubmitted(false);
    }, 5000);
  };

  if (submitted) {
    return (
        <div className="container mx-auto px-4 py-12">
            <Card className="max-w-2xl mx-auto">
                 <CardContent className="p-10 text-center">
                    <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                    <h2 className="text-2xl font-headline mb-3">{t('messageSuccessTitle')}</h2>
                    <p className="text-muted-foreground mb-6">
                        {t('messageSuccessDescription')}
                    </p>
                    <Button asChild>
                        <Link href="/products">{t('continueShopping')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">{t('contactUs')}</CardTitle>
          <CardDescription>
            {t('contactPrompt')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('fullName')}</Label>
                <Input id="name" placeholder={t('fullNamePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailAddress')}</Label>
                <Input id="email" type="email" placeholder={t('emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t('subject')}</Label>
              <Input id="subject" placeholder={t('subjectPlaceholder')} value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t('message')}</Label>
              <Textarea id="message" placeholder={t('messagePlaceholder')} rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <Button type="button" className="w-full" onClick={handleSend}>
              {t('sendMessage')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
