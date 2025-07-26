
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function ProfileRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      router.push('/login');
    } else {
      router.push(`/profile/${user.username}`);
    }
  }, [user, loading, router]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <p>Loading profile...</p>
    </div>
  );
}
