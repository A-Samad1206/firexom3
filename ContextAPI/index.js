import { useReducer, createContext, useContext } from 'react';

import cartReducer from './Cart/cartReducer';

const CartContext = createContext();

const ContextProvider = (props) => {
  const [carts, cartDispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('carts');
      console.log('Provider');
      return localData ? JSON.parse(localData) : [];
    }
  });
  // useEffect(() => {
  //   const cartAlreadyExist = JSON.parse(localStorage.getItem('carts'));
  //   // const orderAlreadyExist = JSON.parse(localStorage.getItem('shipDetails'));
  //   // orderAlreadyExist && orderDispatch({ payload: orderAlreadyExist });
  //   console.log('Ctx Api Initialised');
  //   cartAlreadyExist &&
  //     cartAlreadyExist.length &&
  //     cartDispatch({
  //       type: 'INIT',
  //       payload: cartAlreadyExist,
  //     });
  // }, []);
  return (
    <CartContext.Provider value={{ carts, cartDispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default ContextProvider;
export { CartContext };
