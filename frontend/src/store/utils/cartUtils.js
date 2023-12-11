const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export default function updateCart(state) {
  //calculate items price
  state.itemsPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate shipping price
  state.shippingPrice = addDecimal(
    state.itemsPrice > 100 && state.itemsPrice !== 0 ? 0 : 10
  );

  //calculate tax price
  state.taxPrice = addDecimal(Number(state.itemsPrice * 0.15));

  //calculate total price
  state.totalPrice = addDecimal(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}
