import { configureStore } from "@reduxjs/toolkit";

import basketReducer from "./basketSlice";

const store = configureStore({ reducer: { basket: basketReducer } });

// try & catch in case local storage is disabled
// local storage is undefined initially in next.js due to SSR
// only subscribe the store when local storage is available after page loaded
// try {
//   if (typeof localStorage !== undefined)
//     store.subscribe(() => {
//       const basket = store.getState().basket;
//       // save basket to local storage
//       localStorage.setItem("name-brand-basket", JSON.stringify(basket));
//     });
// } catch (err) {
//   console.error(err);
// }

export default store;
