import { useCart } from '#Ctx';
import CartTable from './CartTable';
import EmptyCart from './EmptyCart';
import OrderSummary from './OrderSummary';
import TopHeader from './TopHeader';

const index = () => {
  const { carts, cartDispatch } = useCart();

  const inc = (id) => cartDispatch({ type: 'INC_CART', payload: { id } });
  const dec = (id) => cartDispatch({ type: 'DEC_CART', payload: { id } });
  const remove = (id) => cartDispatch({ type: 'DEL_CART', payload: { id } });
  const totalPrice =
    carts && carts.reduce((total, cart) => total + cart.itemPrice, 0);
  return typeof carts !== 'undefined' && carts.length ? (
    <div className="flex flex-wrap w-full">
      <div
        id="itemsDisplay"
        className="mx-auto w-full  md:w-3/4  bg-white px-4 py-10"
      >
        <TopHeader length={carts.length} />
        <CartTable carts={carts} inc={inc} dec={dec} remove={remove} />
      </div>
      <div
        id="orderSummary"
        className="bg-[#f6f6f6] w-full md:w-1/4 mx-auto mt-4 md:mt-0"
      >
        <OrderSummary length={carts.length} totalPrice={totalPrice} />
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
};

export default index;
