import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import { ShoppingCartIcon, ArrowSmRightIcon } from '@heroicons/react/solid';

import Selection from './Selection';
import { useCart } from '#Ctx';

const Card = ({ product }) => {
  const render = useRef(0);
  render.current++;
  console.log('home/card', render.current);
  const { slug, name, price, img, id } = product;
  const { cartDispatch } = useCart();
  const router = useRouter();
  const addToCart = () => {
    cartDispatch({
      type: 'ADD_CART',
      payload: {
        slug,
        name,
        price,
        img,
        id,
      },
    });
    router.push('/cart');
  };
  return (
    <div className="border-[0.25px] border-gray-200 shadow-lg rounded-lg  ">
      <div className="overflow-hidden">
        <div className=" w-full transition-transform duration-800 transform scale-1  hover:scale-125 overflow-hidden flex justify-center">
          <Image
            width={250}
            height={250}
            src={`${product.img}`}
            alt={product.slug}
            scale={100}
          />
        </div>
      </div>
      <div className="p-5 pb-2 ">
        <h3 className="uppercase">
          <a href=""> {product.name}</a>
        </h3>
        <Selection />
        <div className="uppercase text-lg px-4  pb-2 font-semibold ">
          ${product.price}
        </div>
        <div className="flex mt-3 flex-wrap  justify-between flex-row">
          <button
            className="cursor-pointer inline-flex items-center my-2 rounded-full px-4 py-1 text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 focus:shadow-2xl transition duration-600 focus:outline-none"
            onClick={addToCart}
          >
            <div className="flex items-center">
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
              Buy
            </div>
          </button>
          <Link href={`/product/${product.slug}`}>
            <a className="cursor-pointer inline-flex items-center my-2 rounded-full px-4 py-1 text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 focus:shadow-2xl transition duration-600 focus:outline-none">
              <ArrowSmRightIcon className="w-4 h-4 mr-2" />
              View
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Card;
