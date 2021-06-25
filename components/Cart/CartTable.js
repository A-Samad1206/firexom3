import React from 'react';
import TabRow from './TabRow';

const CartTable = ({ carts, inc, dec, remove }) => {
  return (
    <div className="w-full overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="min-w-[13rem]  px-4 py-3 tracking-wider font-medium text-gray-900 text-xs bg-gray-100 rounded-tl rounded-bl   text-center   uppercase">
              Product Details
            </th>
            <th className="  px-4 py-3 tracking-wider font-medium text-gray-900 text-xs bg-gray-100 rounded-tl rounded-bl      uppercase">
              Quantity
            </th>
            <th className="  px-4 py-3 tracking-wider font-medium text-gray-900 text-xs bg-gray-100 rounded-tl rounded-bl      uppercase">
              Price
            </th>
            <th className="  px-4 py-3 tracking-wider font-medium text-gray-900 text-xs bg-gray-100 rounded-tl rounded-bl      uppercase">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <TabRow
              key={cart.id}
              cart={cart}
              inc={inc}
              dec={dec}
              remove={remove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
