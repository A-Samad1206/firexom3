import Link from 'next/link';
import {
  ArrowLeftIcon,
  ArrowNarrowRightIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/solid';
import { useCart } from '#Ctx';
import { useEffect, useRef, useState } from 'react';
import { TrashIcon } from '@heroicons/react/solid';
const cart = () => {
  const render = useRef(0);
  render.current++;
  console.log('page/cart', render.current);
  // const [carts, setCarts] = useState([]);
  const { carts, cartDispatch } = useCart();
  // useEffect(() => {
  //   cartDispatch({ type: 'GET' });
  // }, []);
  console.log('cartsFrom Cart', carts);
  console.log("typeof carts !== 'undefined'", typeof carts);

  // Cart Action increment,decrement,delete
  const inc = (id) => cartDispatch({ type: 'INC_CART', payload: { id } });
  const dec = (id) => cartDispatch({ type: 'DEC_CART', payload: { id } });
  const remove = (id) => cartDispatch({ type: 'DEL_CART', payload: { id } });
  const totalPrice =
    carts && carts.reduce((total, cart) => total + cart.itemPrice, 0);

  return (
    typeof carts !== 'undefined' &&
    carts && (
      <div className="flex flex-wrap  shadow-lg  ">
        <div
          id="itemsDisplay"
          className="w-full  sm:w-3/4 bg-white px-10 py-10"
        >
          {carts.length && <TopHeader carts={carts} />}
          {carts.length ? (
            carts.map((cart) => (
              <ItemRow
                key={cart.id}
                inc={inc}
                dec={dec}
                remove={remove}
                cart={cart}
              />
            ))
          ) : (
            <div className="flex justify-center">
              <div className="mx-auto p-20 inline-flex justify-center bg-green-300 items-center rounded-lg shadow-lg text-5xl">
                Empty
              </div>
            </div>
          )}
          <Link href="/">
            <a
              className="cursor-pointer inline-flex items-center  my-2 

          rounded-full px-6 py-2 text-white
          bg-blue-500
            hover:bg-blue-300
            focus:bg-blue-600
            hover:shadow-lg
            focus:shadow-xl
            transition duration-600
            focus:outline-none  "
            >
              <ArrowLeftIcon className=" mr-2  w-4" />
              Continue Shopping
            </a>
          </Link>
        </div>

        {carts.length && (
          <OrderSummary length={carts.length} totalPrice={totalPrice} />
        )}
      </div>
    )
  );
};

export default cart;
const TopHeader = ({ carts }) => {
  console.log('pages/cart/TopHeader');
  return (
    <>
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">{carts.length} Items</h2>
      </div>
      <div className="flex mt-10 mb-5">
        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
          Product Details
        </h3>
        <h3
          className="
                  font-semibold
                    text-gray-600 text-xs
                  uppercase
                  w-1/5
                  text-center
                "
        >
          Quantity
        </h3>
        <h3
          className="
                  font-semibold
                  text-center text-gray-600 text-xs
                  uppercase
                  w-1/5
                "
        >
          Price
        </h3>
        <h3
          className="
                  font-semibold
                  text-gray-600 text-xs
                  uppercase
                  w-1/5
                  text-center
                "
        >
          Total
        </h3>
      </div>
    </>
  );
};
const ItemRow = ({ inc, dec, remove, cart }) => {
  console.log('page/cart/itemrow');
  return (
    <div className="flex   items-center  -mx-8 px-6 py-5">
      <div className="flex w-2/5  ">
        <div className="w-20">
          <img className="h-24" src={cart.img} alt={cart.name} />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <Link href={`/product/${cart.slug}`}>
            <a className="font-bold text-sm cursor-pointer">{cart.name}</a>
          </Link>
          <span className="text-green-500 text-xs">Apple</span>
          <button
            onClick={() => remove(cart.id)}
            className="self-start
            transition-all duration-300
            font-semibold outline-none
            py-1 px-2 
            text-gray-50     
            hover:text-red-900 
            focus:outline-none
            bg-red-300 
            rounded-md shadow-sm
            hover:bg-red-100 hover:shadow-md
            focus:shadow-lg 
          focus:bg-red-400 
          focus:text-white
          "
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-center   w-1/5">
        <button
          onClick={() => dec(cart.id)}
          className="outline-none   px-1 
        rounded-full
        bg-gray-200
        hover:bg-gray-300
        focus:outline-none
       
        focus:bg-gray-400 
        "
        >
          <MinusIcon className="fill-current text-gray-600 w-4 h-4" />
        </button>

        <input
          className="mx-2 border text-center w-8"
          type="text"
          value={cart.qty}
          onChange={() => console.log('o')}
        />
        <button
          onClick={() => inc(cart.id)}
          className="outline-none   px-1 
        rounded-full
        bg-gray-200
        hover:bg-gray-300
        focus:outline-none
       
        focus:bg-gray-400 "
        >
          <PlusIcon className="fill-current text-gray-600 w-4 h-4" />
        </button>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.price}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.itemPrice}
      </span>
    </div>
  );
};
const OrderSummary = ({ length, totalPrice }) => {
  console.log('page/cart/orderSummary');
  return (
    <div
      id="orderSummary"
      className="bg-[#f6f6f6] w-full sm:w-1/4 px-8 py-10   "
    >
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Items {length}</span>
        <span className="font-semibold text-sm">${totalPrice}</span>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          Shipping
        </label>
        <select className="block p-2 text-gray-600 w-full text-sm">
          <option>Standard shipping - $10.00</option>
        </select>
      </div>
      <div className="py-10">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          value={5}
          placeholder="Enter your code"
          className="p-2 text-sm w-full"
          onChange={() => console.log('object')}
        />
      </div>
      <button
        className="
        bg-red-500
        hover:bg-red-600
        px-5
        py-2
        text-sm text-white
        uppercase
      "
      >
        Apply
      </button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>${totalPrice + 10}</span>
        </div>
        <Link href="/checkout">
          <a
            className="cursor-pointer   my-2  w-full inline-flex justify-center items-center  
          rounded-lg px-6 py-4 text-white
          bg-blue-500
           
            hover:bg-blue-400
            focus:bg-blue-600
            hover:shadow-lg
            focus:shadow-xl
            transition duration-600
            focus:outline-none 
        "
          >
            Checkout
            <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />
          </a>
        </Link>
      </div>
    </div>
  );
};
