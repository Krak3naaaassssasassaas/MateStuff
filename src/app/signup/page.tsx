
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

export default function SignupPage() {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({
        title: "Signup Failed",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
     if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast({
        title: "Signup Failed",
        description: "Username can only contain letters, numbers, and underscores.",
        variant: "destructive",
      });
      return;
    }

    try {
      signup(fullName, username, email, password);
      toast({
        title: "Signup Successful",
        description: "You can now log in with your new account.",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t('createAnAccount')}</CardTitle>
          <CardDescription>
            {t('createAccountPrompt')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="full-name">{t('fullName')}</Label>
              <Input
                id="full-name"
                placeholder={t('fullNamePlaceholder')}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">{t('username')}</Label>
              <Input
                id="username"
                placeholder={t('usernamePlaceholder')}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('emailAddress')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              {t('createAnAccount')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('alreadyHaveAccount')}{" "}
            <Link href="/login" className="underline">
              {t('login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
