import { useEffect } from "react";
import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";

import "../styles/globals.css";
import store from "../components/redux/store";
import Layout from "../components/Layout";
import { hydrateBasket } from "../components/redux/basketSlice";

// try & catch in case local storage is disabled
// local storage is undefined initially in next.js due to SSR
// only subscribe the store when local storage is available after page loaded
try {
  if (typeof localStorage !== "undefined")
    store.subscribe(() => {
      const basket = store.getState().basket;
      // save basket to local storage
      localStorage.setItem("name-brand-basket", JSON.stringify(basket));
    });
} catch (err) {
  console.error(err);
}

export default function MyApp({ Component, pageProps }) {
  // fetch items from localstorage and update the basket if items exist
  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        const storedBasket = localStorage.getItem("name-brand-basket");
        storedBasket
          ? store.dispatch(hydrateBasket(JSON.parse(storedBasket)))
          : store.dispatch(hydrateBasket({ items: [] }));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  );
}
