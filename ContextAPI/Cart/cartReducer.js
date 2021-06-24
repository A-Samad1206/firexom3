const setCarts = (state) =>
  localStorage.setItem('carts', JSON.stringify(state));

const getCarts = () => JSON.parse(localStorage.getItem('carts'));

const addToLocal = (state) => {
  const temp = [];
  state.forEach((doc) => {
    temp.push({ ...doc, itemPrice: Number(doc.qty) * Number(doc.price) });
  });
  setCarts(temp);
  return getCarts();
};

const ifAlreadyExist = (id) => getCarts().find((data) => data.id === id);

const incOrDec = (inc = true, id) => {
  let carts = [];
  getCarts().forEach((cart) => {
    if (cart.id === id) {
      const incDec = inc ? ++cart.qty : cart.qty > 1 ? --cart.qty : cart.qty;
      cart.qty = incDec;
      carts.push(cart);
    } else {
      carts.push(cart);
    }
  });
  return carts;
};

const cartReducer = (state, action) => {
  const name = action?.payload?.name,
    price = action?.payload?.price,
    slug = action?.payload?.slug,
    id = action?.payload?.id,
    qty = 1,
    img = action?.payload?.img;
  console.log('From caart Reducers');
  switch (action.type) {
    case 'ADD_CART':
      const letCat = { id, name, price, slug, qty, img };
      if (state.length && ifAlreadyExist(id)) {
        return addToLocal(incOrDec(true, id));
      } else {
        return addToLocal([...state, letCat]);
      }

    case 'DEL_CART':
      return addToLocal(state.filter((cartItem) => cartItem.id !== id));

    case 'REMOVE':
      return addToLocal([]);
    case 'INC_CART':
      return addToLocal(incOrDec(true, id));

    case 'DEC_CART':
      return addToLocal(incOrDec(false, id));

    case 'INIT':
      return [...state, ...action.payload];
    case 'GET':
      return getCarts();
    default:
      return state;
  }
};
export default cartReducer;
