import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AtmForm from '#components/Atm';
import { auth } from '#firebase';
import { getOrder } from '#LIB/orders';
import Skeleton from '#UI/Skeleton';

const Pay = () => {
  console.log('page/Pay');

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [order, setOrder] = useState();

  useEffect(() => {
    const get = async () => {
      console.table({ uid: user?.uid, id });
      !loading && !user && router.push('/login');
      const { data } = !loading && user && (await getOrder(user.uid, id));
      console.log('data', data);
      data?.payment?.paid === true && router.push(`/order/${data.id}`);
      data !== false ? setOrder(data) : router.push('/profile');
    };
    get();
  }, [user]);

  return (
    <div className="mx-auto w-full md:max-w-[75%]  rounded-lg shadow-md p-8">
      <h1 className="text-center font-bold text-2xl uppercase mb-4">
        Order Summary
      </h1>

      {order ? (
        <>
          <TopHeader />
          {order.items.map((cart) => (
            <ItemRow key={cart.id} cart={cart} />
          ))}
          <Total label="Shipping" value="Free" />
          <Total label="Total" value={`$${order.invoice.totalPrice}`} />
          <div className="grid mt-8 grid-cols-1 md:grid-cols-5">
            <div
              id="shippingDetails"
              className="text-base space-y-1 col-span-2"
            >
              <div className="text-xl font-semibold py-4 ">Ship To:-</div>

              <div>
                {order?.shippingAddress?.firstName}{' '}
                {order?.shippingAddress?.lastName}
              </div>
              <div>{order?.shippingAddress?.phNo}</div>
              <div>{order?.shippingAddress?.company}</div>
              <div>{order?.shippingAddress?.address1}</div>
              <div>{order?.shippingAddress?.address2}</div>
              <div>
                {order?.shippingAddress?.zipcode},{' '}
                {order?.shippingAddress?.city}, {order?.shippingAddress?.state},{' '}
                {order?.shippingAddress?.country}
              </div>
            </div>
            <div
              id="paymentDetails"
              className="text-base  col-span-3  space-y-1"
            >
              <AtmForm orderId={order.id} userId={user.uid} />
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-6 space-y-8">
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
          <Pulse />
        </div>
      )}
    </div>
  );
};

export default Pay;

const ItemRow = ({ cart }) => (
  <div className="flex items-center    py-5">
    <div className="flex w-2/5 items-center  ">
      <div className="w-20">
        <img className="h-24" src={cart.img} alt={cart.name} />
      </div>
      <div className="flex flex-col justify-between items-center ml-4 flex-grow">
        <Link href={`/product/${cart.slug}`}>
          <span className="font-bold text-sm cursor-pointer">{cart.name}</span>
        </Link>
      </div>
    </div>
    <div className="flex justify-center w-1/5">
      <div className="mx-2 border text-center w-8">{cart.qty}</div>
    </div>
    <span className="text-center w-1/5 font-semibold text-sm">
      ${cart.price}
    </span>
    <span className="text-center w-1/5 font-semibold text-sm">
      ${cart.itemPrice}
    </span>
  </div>
);
const TopHeader = () => {
  console.log('pay/TopHeader');
  return (
    <div className="flex items-center font-semibold text-sm">
      <span className="w-2/5">Product</span>
      <span className="text-center w-1/5">Qty</span>
      <span className="text-center w-1/5">Price</span>
      <span className="text-center w-1/5">Total Price</span>
    </div>
  );
};
const Total = ({ label, value }) => {
  console.log('pay/Total');

  return (
    <div className="flex items-center justify-between px-4 py-2 text-xl font-semibold ">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
const Pulse = () => (
  <>
    <Skeleton className="h-16  rounded-full     col-start-1" />
    <Skeleton className="w-full h-16 rounded-full col-start-2 col-end-7" />
  </>
);
