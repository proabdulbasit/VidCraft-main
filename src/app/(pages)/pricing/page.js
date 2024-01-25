'use client';

import Pricing from '@/components/Pricing';
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import supabase from '@/services/supabase/client';

export default function PricingPage() {
  const [session, setSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);
  // const [products, subscription] = Promise.all([
  //   getActiveProductsWithPrices(),
  //   getSubscription(),
  // ]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('event', event);
        console.log('session', session);
        console.log('supabase.auth.user()', session?.user);
        getData(session?.user?.id);

        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const getData = async (userId) => {
    const prods = await getActiveProductsWithPrices();
    const sub = await getSubscription(userId);
    const sortedProds = prods.sort((a, b) => a.package_order - b.package_order);
    setProducts(sortedProds);
    setSubscription(sub);
  };

  return (
    <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    />
  );
}
