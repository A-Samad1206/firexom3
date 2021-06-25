import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
const OrderSummary = ({ length, totalPrice }) => {
  return (
    <>
      <div className="px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">
            Items {length}
          </span>
          <span className="font-semibold text-sm">${totalPrice}</span>
        </div>

        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${totalPrice + 10}</span>
          </div>
        </div>
      </div>
      <div className="w-full px-2">
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
    </>
  );
};
export default OrderSummary;
const Extra = () => (
  <>
    {' '}
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
  </>
);
