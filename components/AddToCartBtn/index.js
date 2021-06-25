import { useRouter } from 'next/router';
import { useCart } from '#Ctx';
const index = ({ children, product: { slug, name, price, img, id } }) => {
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
  return <div onClick={addToCart}>{children}</div>;
};

export default index;
