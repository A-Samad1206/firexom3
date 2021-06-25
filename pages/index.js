import React from 'react';
import HomeScreen from '../components/Home';
import { db } from '#firebase';
// import data from '../data';
const index = ({ products }) => {
  return <HomeScreen title="Men's Collection" data={products} />;
};
export const getStaticProps = async () => {
  let products = [];
  const docs = await db.collection('products').get();

  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};
export default index;
