import { useEffect, useRef } from 'react';

import useCartStore, { CartItem } from '@store/cart';

import { useSession } from '@lib/session/provider';

import { trpc } from '~trpc/client';

// Helper to deduplicate and merge cart items by variantId/productId
function mergeCartItems(
  localItems: CartItem[],
  dbItems: CartItem[]
): CartItem[] {
  const map = new Map<string, CartItem>();
  [...localItems, ...dbItems].forEach((item) => {
    const key = item.variantId || item.productId;
    if (!key) return;
    if (map.has(key)) {
      // Sum quantities if duplicate
      map.set(key, {
        ...item,
        quantity: map.get(key)!.quantity + item.quantity,
      });
    } else {
      map.set(key, { ...item });
    }
  });
  return Array.from(map.values());
}

const CartSync = () => {
  const { isAuthenticated, user } = useSession();
  const cartStore = useCartStore();

  // Only enable the query when user is authenticated and has an ID
  const { data: dbCart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: isAuthenticated && !!user?.id,
  });

  const mergeCart = trpc.cart.mergeCart.useMutation();
  const addOrUpdateItem = trpc.cart.addOrUpdateItem.useMutation();
  const removeItem = trpc.cart.removeItem.useMutation();

  // Track if we've already synced after login
  const hasSyncedRef = useRef(false);

  // On login: merge local and DB cart, then update both
  useEffect(() => {
    if (isAuthenticated && user?.id && dbCart && !hasSyncedRef.current) {
      hasSyncedRef.current = true;
      const localItems = cartStore.items;
      const dbItems = dbCart.items || [];
      // Convert DB items to local format
      const dbItemsFormatted = dbItems.map((item) => ({
        productId: item.productId || undefined,
        variantId: item.variantId || undefined,
        quantity: item.quantity,
      }));
      // Merge and deduplicate
      const merged = mergeCartItems(localItems, dbItemsFormatted);
      // Update local store
      cartStore.setItems(merged);
      // Update DB
      mergeCart.mutate({ items: merged });
    }
    // On logout, reset sync flag
    if (!isAuthenticated || !user?.id) {
      hasSyncedRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user?.id, dbCart]);

  // On cart changes: sync with DB if logged in
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    // If we haven't synced yet and have local items, sync them immediately
    if (!hasSyncedRef.current && cartStore.items.length > 0) {
      mergeCart.mutate({ items: cartStore.items });
      hasSyncedRef.current = true;
      return;
    }

    // Only sync after initial sync is complete
    if (!hasSyncedRef.current) return;

    // For each item, upsert in DB
    cartStore.items.forEach((item) => {
      addOrUpdateItem.mutate({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      });
    });

    // Remove items from DB that are not in local cart
    if (dbCart && dbCart.items) {
      dbCart.items.forEach((dbItem) => {
        const exists = cartStore.items.some(
          (item) =>
            (item.variantId && item.variantId === dbItem.variantId) ||
            (item.productId && item.productId === dbItem.productId)
        );
        if (!exists) {
          removeItem.mutate({
            productId: dbItem.productId || undefined,
            variantId: dbItem.variantId || undefined,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStore.items, isAuthenticated, user?.id]);

  return null; // No UI
};

export default CartSync;
