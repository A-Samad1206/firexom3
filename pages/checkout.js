import React from 'react';
import Checkout from '#components/Checkout';
const checkout = () => {
  const render = React.useRef(0);
  render.current++;
  console.log('page/checkout', render.current);
  return <Checkout />;
};

export default checkout;
