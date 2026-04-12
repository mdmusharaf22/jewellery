'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /all
    router.replace('/all');
  }, [router]);

  return null;
}
