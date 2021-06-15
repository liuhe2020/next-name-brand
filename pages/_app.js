import { useEffect } from "react";
import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";

import "../styles/globals.css";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   // try & catch in case local storage is disabled
  //   // local storage is undefined initially in next.js due to SSR
  //   try {
  //     if (typeof localStorage !== "undefined") {
  //       const storedBasket = localStorage.getItem("name-brand-basket");
  //       storedBasket
  //         ? store.dispatch(hydrateBasket(JSON.parse(storedBasket)))
  //         : store.dispatch(hydrateBasket({ item: [] }));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);

  return (
    // <AuthProvider session={pageProps.session}>
    //   <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    //   </Provider>
    // </AuthProvider>
  );
}
