import { ShoppingCartIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '#firebase';
import { useCart } from '#Ctx';
// /users//orders/
const index = () => {
  const { carts } = useCart();
  const [user] = useAuthState(auth);
  const logout = () => auth.signOut();

  return (
    <div className="bg-blue-200">
      <header className="container  mx-auto w-full p-2">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <div className="flex justify-center items-center">
            <div className="text-2xl font-medium  ml-2">
              <Link href="/">NEXOM</Link>
            </div>
          </div>
          <div className="flex flex-wrap   sm:ml-auto sm:my-0 mt-4 items-center">
            {user ? (
              <>
                <div onClick={logout}>
                  <div className="cursor-pointer transition-all duration-300 hover:text-brand p-2  mr-5  border-transparent  border-b-4 hover:border-gray-500 ">
                    Logout
                  </div>
                </div>
                <Link href="/profile">
                  <a className="cursor-pointer  transition-all duration-300 hover:text-brand p-2  mr-5  border-transparent  border-b-4 hover:border-gray-500 ">
                    Profile
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a className="cursor-pointer  transition-all duration-300 hover:text-brand p-2  mr-5  border-transparent  border-b-4 hover:border-gray-500 ">
                    Login
                  </a>
                </Link>
              </>
            )}

            <Link href="/cart">
              <a className="bg-purple-600  inline-flex  p-2  justify-center items-center  rounded-full px-4 py-2 text-white">
                <ShoppingCartIcon className="h-4 w-4  mr-1" />
                Cart({carts && carts.length})
              </a>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default index;
