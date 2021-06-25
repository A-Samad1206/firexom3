import React from 'react';

const TopHeader = ({ length }) => {
  return (
    <div className="flex justify-between border-b pb-8">
      <h1 className="font-semibold text-2xl">Shopping Cart</h1>
      <h2 className="font-semibold text-2xl">{length} Items</h2>
    </div>
  );
};

export default TopHeader;
