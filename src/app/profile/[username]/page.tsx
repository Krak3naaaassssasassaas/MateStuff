
"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { UploadCloud, Camera, Grid3x3, Edit, UserPlus, UserCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, User } from "@/lib/types";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/language-context";

function ProductGridItem({ product, isOwner, onDelete }: { product: Product, isOwner: boolean, onDelete: (productId: string) => void }) {
  return (
    <Link href={`/products/${product.id}`} className="block group">
        <Card className="overflow-hidden relative h-full">
            <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="aspect-square object-cover w-full"
                data-ai-hint={product.dataAiHint}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div>
                    <h3 className="font-bold text-primary-foreground">{product.name}</h3>
                    <p className="text-sm text-primary-foreground/80">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</p>
                </div>
                {isOwner && (
                    <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 p-0 z-10"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent link navigation when deleting
                            onDelete(product.id);
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete product</span>
                    </Button>
                )}
            </div>
        </Card>
    </Link>
  );
}

export default function ProfilePage() {
  const { user: loggedInUser, loading, addUserProduct, getUserByUsername, toggleFollow, deleteUserProduct } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [profileUserProducts, setProfileUserProducts] = useState<Product[]>([]);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // State for upload form
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);
  const [productCategory, setProductCategory] = useState('');

  const productImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const username = params.username as string;
    if (loading) return;

    if (!loggedInUser) {
        router.push('/login');
        return;
    }

    const fetchedUser = getUserByUsername(username);
    if (fetchedUser) {
      setProfileUser(fetchedUser);
      const userProducts = localStorage.getItem(`products_${fetchedUser.id}`);
      setProfileUserProducts(userProducts ? JSON.parse(userProducts) : []);
      
      const isSameUser = loggedInUser?.id === fetchedUser.id;
      setIsCurrentUser(isSameUser);
      
      if (!isSameUser) {
        setIsFollowing(loggedInUser?.following.includes(fetchedUser.id) || false);
      }

    } else {
      // Handle user not found, maybe redirect to a 404 page
      toast({ title: "User not found", variant: "destructive" });
      router.push('/');
    }
  }, [params.username, loading, loggedInUser, getUserByUsername, router, toast]);

  const handleProductImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProductUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice || !productImage || !productCategory) {
        toast({
            title: "Upload Failed",
            description: "Please fill all fields, select a category, and upload an image.",
            variant: "destructive"
        });
        return;
    }
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: productName,
      description: productDescription,
      price: parseInt(productPrice),
      image: productImage,
      category: productCategory,
      condition: "gently-used", // Default condition
      rating: 0,
      reviewCount: 0,
      dataAiHint: "user upload"
    };
    addUserProduct(newProduct);
    setProfileUserProducts(prev => [...prev, newProduct]);
    toast({ title: "Product Uploaded!", description: `${productName} is now for sale.`});
    // Reset form
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
    setProductCategory('');
    if(productImageInputRef.current) {
        productImageInputRef.current.value = "";
    }
  };

  const handleFollowToggle = () => {
    if (!profileUser || !loggedInUser) return;
    toggleFollow(profileUser.id);
    setIsFollowing(!isFollowing);
    // Optimistically update follower count
    setProfileUser(prev => {
      if (!prev) return null;
      const newFollowers = [...(prev.followers || [])];
      if (isFollowing) { // about to unfollow
        const index = newFollowers.indexOf(loggedInUser.id);
        if (index > -1) newFollowers.splice(index, 1);
      } else { // about to follow
        newFollowers.push(loggedInUser.id);
      }
      return { ...prev, followers: newFollowers };
    });
  };

  const handleProductDelete = (productId: string) => {
    deleteUserProduct(productId);
    setProfileUserProducts(prev => prev.filter(p => p.id !== productId));
    toast({ title: "Product Deleted", description: "Your item has been removed." });
  }

  if (loading || !profileUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="flex items-center gap-8 mb-8">
        <Avatar className="h-24 w-24 md:h-36 md:w-36">
          <AvatarImage src={profileUser.photo} alt={profileUser.name} />
          <AvatarFallback>{getInitials(profileUser.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-light">{profileUser.username}</h1>
            {isCurrentUser ? (
              <Button variant="secondary" size="sm" asChild>
                <Link href="/profile/edit"><Edit className="mr-2 h-4 w-4"/>{t('editProfile')}</Link>
              </Button>
            ) : (
                <Button variant={isFollowing ? "secondary" : "default"} size="sm" onClick={handleFollowToggle}>
                    {isFollowing ? <UserCheck className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {isFollowing ? t('unfollow') : t('follow')}
                </Button>
            )}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div><span className="font-semibold">{profileUserProducts.length}</span> {t('posts')}</div>
            <div><span className="font-semibold">{profileUser.followers?.length ?? 0}</span> {t('followers')}</div>
            <div><span className="font-semibold">{profileUser.following?.length ?? 0}</span> {t('following')}</div>
          </div>
          <div>
            <h2 className="font-semibold">{profileUser.name}</h2>
            <p className="text-sm text-muted-foreground">Conscious consumer. Vintage lover.</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className={cn("w-full", isCurrentUser ? "grid grid-cols-2" : "grid grid-cols-1")}>
          <TabsTrigger value="posts"><Grid3x3 className="mr-2 h-4 w-4" /> {t('posts').charAt(0).toUpperCase() + t('posts').slice(1)}</TabsTrigger>
          {isCurrentUser && <TabsTrigger value="upload"><UploadCloud className="mr-2 h-4 w-4" /> {t('uploadProduct')}</TabsTrigger>}
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          {profileUserProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {profileUserProducts.map(product => (
                    <ProductGridItem key={product.id} product={product} isOwner={isCurrentUser} onDelete={handleProductDelete} />
                ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('noPostsYet')}</h3>
                <p>{t('noPostsDescription')}</p>
            </div>
          )}
        </TabsContent>
        {isCurrentUser && (
            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('uploadProductTitle')}</CardTitle>
                  <CardDescription>{t('uploadProductDescription')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleProductUpload}>
                    <div className="space-y-2">
                      <Label htmlFor="product-name">{t('productName')}</Label>
                      <Input id="product-name" placeholder={t('productNamePlaceholder')} value={productName} onChange={e => setProductName(e.target.value)} required/>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="product-description">{t('productDescription')}</Label>
                      <Textarea id="product-description" placeholder={t('productDescriptionPlaceholder')} value={productDescription} onChange={e => setProductDescription(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                        <Label htmlFor="price">{t('price')}</Label>
                        <Input id="price" type="number" placeholder={t('pricePlaceholder')} value={productPrice} onChange={e => setProductPrice(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">{t('category')}</Label>
                         <Select onValueChange={setProductCategory} value={productCategory}>
                            <SelectTrigger id="category">
                                <SelectValue placeholder={t('selectCategory')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Apparel">{t('apparel')}</SelectItem>
                                <SelectItem value="Jewelry">{t('jewelry')}</SelectItem>
                                <SelectItem value="Accessories">{t('accessories')}</SelectItem>
                            </SelectContent>
                        </Select>
                      </div>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="product-image">{t('productImage')}</Label>
                      <Input id="product-image" type="file" className="file:text-foreground" onChange={handleProductImageUpload} ref={productImageInputRef} accept="image/*" required/>
                      {productImage && <Image src={productImage} alt="Preview" width={100} height={100} className="mt-2 rounded-md object-cover" />}
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      <UploadCloud className="w-4 h-4 mr-2" />
                      {t('upload')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
