import { ArrowSmRightIcon } from '@heroicons/react/solid';
import Card from './Card';
import Link from 'next/link';
const index = ({ title, data }) => {
  console.log('home/index');
  return (
    data && (
      <div className="border-t mx-4 sm:mx-0 ">
        <div className="flex flex-row justify-between  my-5">
          <h2 className="text-xl">{title}</h2>
          <Link href="/">
            <button
              className="text-md flex flex-row py-1 px-3 rounded-md 
              
              items-center
            bg-gray-300
          hover:bg-gray-200
            outline-none
            focus:bg-gray-100
            focus:border-none
            focus:outline-none
            focus:shadow-lg
            transition-all duration-500
          "
            >
              View All
              <ArrowSmRightIcon className="h-7 w-6 ml-1" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4  ">
          {data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  );
};

export default index;
