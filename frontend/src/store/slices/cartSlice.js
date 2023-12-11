import { createSlice } from '@reduxjs/toolkit';
import updateCart from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((x) => x._id === newItem._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => {
          return x._id === existItem._id ? newItem : x;
        });
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      return updateCart(state);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice;