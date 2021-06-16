import { useEffect } from "react";
import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";

import "../styles/globals.css";
import store from "../components/redux/store";
import Layout from "../components/Layout";
import { hydrateBasket } from "../components/redux/basketSlice";

// try & catch in case local storage is disabled
try {
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
    // local storage is undefined initially in next.js due to SSR
    try {
      if (typeof localStorage !== "undefined") {
        const storedBasket = localStorage.getItem("name-brand-basket");
        storedBasket
          ? store.dispatch(hydrateBasket(JSON.parse(storedBasket)))
          : store.dispatch(hydrateBasket({ item: [] }));
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
