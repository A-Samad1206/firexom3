import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '#firebase';
import CartLinkButton from './CartLinkButton';
import { memo } from 'react';
// /users//orders/
const index = () => {
  const [user] = useAuthState(auth);
  const logout = () => auth.signOut();
  return (
    <div className="bg-blue-200">
      <header className="container  mx-auto w-full p-2">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <Link href="/">
            <a className="flex justify-center items-center text-2xl font-medium  ml-2">
              FIREXOM
            </a>
          </Link>
          <div className="flex flex-wrap   sm:ml-auto sm:my-0 mt-4 items-center">
            {user ? (
              <>
                <div
                  onClick={logout}
                  className="cursor-pointer transition-all duration-300 hover:text-brand p-2  mr-5  border-transparent  border-b-4 hover:border-gray-500 "
                >
                  Logout
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

            <CartLinkButton />
          </div>
        </div>
      </header>
    </div>
  );
};

export default memo(index);
