import { ShoppingCartIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { memo, useCallback } from 'react';

import { useCart } from '#Ctx';

const CartLinkButton = () => {
  const { carts } = useCart();
  const cartsMemo = useCallback(() => carts, []);
  console.log('CartButton');
  return (
    <Link href="/cart">
      <a className="bg-purple-600  inline-flex  p-2  justify-center items-center  rounded-full px-4 py-2 text-white">
        <ShoppingCartIcon className="h-4 w-4  mr-1" />
        Cart({cartsMemo?.length})
      </a>
    </Link>
  );
};

export default memo(CartLinkButton);
