'use client';

import { Provider } from 'react-redux';
import { useEffect, useRef } from 'react';
import { store } from '@/store/store';
import { hydrateCart } from '@/store/slices/cartSlice';
import { hydrateAuth } from '@/store/slices/authSlice';
import { hydrateWishlist } from '@/store/slices/wishlistSlice';

function StoreHydrator() {
  const hydrated = useRef(false);
  
  useEffect(() => {
    if (!hydrated.current) {

      // Hydrate all slices from storage on client mount
      store.dispatch(hydrateAuth());
      store.dispatch(hydrateCart());
      store.dispatch(hydrateWishlist());
      hydrated.current = true;

    }
  }, []);
  
  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StoreHydrator />
      {children}
    </Provider>
  );
}
