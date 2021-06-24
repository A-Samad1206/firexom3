import Image from 'next/image';
import { useRouter } from 'next/router';
import data from '../../data';
import { useCart } from '#Ctx';
import { useRef } from 'react';
import { db } from '#firebase';
const SingleProduct = ({ product }) => {
  const render = useRef(0);
  render.current++;
  console.log('page/singleProduct', render.current);

  const { slug, name, price, countInStock, description, rating, img, id } =
    product;
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
    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="col-span-2 mx-auto">
        <Image src={img} alt="Bkack-Office-Chair" width={400} height={400} />
      </div>
      <div className="px-2 col-span-3   w-2/3 md:w-full mx-auto md:mt-0 mt-8">
        <div className="uppercase font-bold text-xl">{name}</div>
        <div className="mt-4 pl-4  flex divide-x divide-gray-500  ">
          <div className="text-sm font-medium pr-4 hover:text-black cursor-pointer   ">
            {rating} Reviews
          </div>
          <div className="text-sm font-medium pl-4 hover:text-black cursor-pointer">
            Add Review
          </div>
        </div>
        <div className="uppercase font-bold mt-4">
          AVAILABILITY :-{' '}
          <span className="inline font-medium normal-case ">
            In Stock {countInStock} Item(S)
          </span>
        </div>
        <div id="price" className="mt-4 font-bold">
          ${price}
        </div>
        <div className="h-1 bg-gray-300 mt-4 mx-8"></div>
        <div className="text-lg leading-7 tracking-wide text-gray-600 mt-8">
          {description}
        </div>
        {/* <Link href={`/cart/?id=${id}`}> */}
        <button
          className="cursor-pointer inline-flex items-center my-4 rounded-full px-6 py-2 text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 focus:shadow-2xl transition duration-600 focus:outline-none    
    "
          onClick={addToCart}
        >
          Add To cart
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};
export const getStaticPaths = async (ctx) => {
  let paths = [];
  await db
    .collection('products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        paths.push({ params: { pid: doc.data().slug } });
      });
    });
  // data[0].forEach((doc) => {
  //   paths.push({ params: { pid: doc.slug } });
  // });

  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
};
export const getStaticProps = async (ctx) => {
  let product;
  await db
    .collection('products')
    .where('slug', '==', ctx.params.pid)
    .get()
    .then((doc) => {
      doc.docs.forEach((doc, index) => {
        if (index === 0) product = { ...doc.data(), id: doc.id };
      });
    });
  // product = data[0].find((doc) => doc.slug === ctx.params.pid);
  console.log('Product of single', product);
  return {
    props: {
      product,
    },
    revalidate: 1,
  };
};
export default SingleProduct;
