import { createSlice } from "@reduxjs/toolkit";

import { handleAddToBasket } from "./basketUtils";
import { handleReduceBasket } from "./basketUtils";

const initialState = { items: [] };

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = handleAddToBasket({
        prevItems: state.items,
        nextItem: action.payload,
      });
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    reduceBasket: (state, action) => {
      state.items = handleReduceBasket({
        prevItems: state.items,
        toRemoveItem: action.payload,
      });
    },
    hydrateBasket: (state, action) => {
      return action.payload;
    },
    emptyBasket: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  reduceBasket,
  hydrateBasket,
  emptyBasket,
} = basketSlice.actions;

// Selectors - pull information from the global store slice
export const selectItems = (state) => state.basket.items;
// reduce basket items to a single total quantity
export const selectBasketQty = (state) =>
  state.basket.items.reduce((quantity, item) => quantity + item.quantity, 0);
// calculate basket subtotal
export const selectBasketSubtotal = (state) =>
  state.basket.items.reduce(
    (price, item) => price + item.price * item.quantity,
    0
  );

export default basketSlice.reducer;
