import { useReducer, createContext, useContext } from 'react';

import cartReducer from './Cart/cartReducer';

const CartContext = createContext();

const ContextProvider = (props) => {
  const [carts, cartDispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('carts');

      return localData ? JSON.parse(localData) : [];
    }
  });
  return (
    <CartContext.Provider value={{ carts, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default ContextProvider;
export { CartContext };
