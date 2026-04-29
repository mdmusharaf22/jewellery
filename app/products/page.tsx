'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /products/all
    router.replace('/products/all');
  }, [router]);

  return null;
}
