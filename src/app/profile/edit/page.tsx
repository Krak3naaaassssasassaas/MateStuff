
"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { Camera, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";

export default function EditProfilePage() {
  const { t } = useLanguage();
  const { user, loading, updateUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setName(user.name);
      setUsername(user.username);
      setPhone(user.phone || '');
      setDob(user.dob || '');
    }
  }, [user, loading, router]);

  const handleProfileUpdate = () => {
    if (!user) return;
    updateUser({ name, username, phone, dob });
    toast({ title: "Profile Updated", description: "Your information has been saved." });
    router.push(`/profile/${username}`);
  };
  
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ photo: reader.result as string });
        toast({ title: "Profile Photo Updated" });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removePhoto = () => {
    updateUser({ photo: '' });
    toast({ title: "Profile Photo Removed" });
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/profile/${user.username}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold ml-2">{t('editProfileTitle')}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('accountInformationTitle')}</CardTitle>
          <CardDescription>{t('accountInformationDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
               <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
              <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                <Camera className="mr-2 h-4 w-4" /> {t('changePhoto')}
              </Button>
              {user.photo && (
                <Button size="sm" variant="ghost" onClick={removePhoto}>
                  <Trash2 className="mr-2 h-4 w-4" /> {t('removePhoto')}
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t('fullName')}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="username">{t('username')}</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('emailAddress')}</Label>
            <Input id="email" value={user.email} disabled />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('phoneNumber')}</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('phoneNumberPlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">{t('dateOfBirth')}</Label>
              <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleProfileUpdate}>{t('saveChanges')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
