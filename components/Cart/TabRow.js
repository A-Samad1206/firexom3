import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import Link from 'next/link';
const TabRow = ({ cart, inc, dec, remove }) => (
  <tr>
    <td className="flex    pr-8 my-4   ">
      <img src={cart.img} alt="backpack" className="w-20 h-24" />
      <div className="flex flex-col  px-4 justify-between  flex-grow">
        <Link href={`/product/${cart.slug}`}>
          <a className="font-bold text-sm cursor-pointer">{cart.name}</a>
        </Link>
        <span className="text-green-500 text-xs">Apple</span>
        <button
          onClick={() => remove(cart.id)}
          className="self-start transition-all duration-300
font-semibold outline-none py-1 px-2 
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
    </td>

    <td className="px-4    ">
      <div className="flex ">
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
          className="outline-none px-1 
rounded-full
bg-gray-200
hover:bg-gray-300
focus:outline-none

focus:bg-gray-400 "
        >
          <PlusIcon className="fill-current text-gray-600 w-4 h-4" />
        </button>
      </div>
    </td>
    <td className="px-4  ">
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.price}
      </span>
    </td>
    <td className="px-4    ">
      <span className="text-center w-1/5 font-semibold text-sm">
        ${cart.itemPrice}
      </span>
    </td>
  </tr>
);
export default TabRow;
