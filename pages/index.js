import React from 'react';
import HomeScreen from '../components/Home';
import { db } from '#firebase';
// import data from '../data';
const index = ({ products }) => {
  const render = React.useRef(0);
  render.current++;
  console.log('page/index', render.current);

  return <HomeScreen title="Men's Collection" data={products} />;
};
export const getStaticProps = async () => {
  const products = [];
  await db
    .collection('products')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
    });

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};
export default index;
