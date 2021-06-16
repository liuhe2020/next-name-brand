import { getSession } from "next-auth/client";
import Head from "next/head";
import moment from "moment";

import db from "../firebase";
import Orders from "../components/Orders";

export default function Account({ session, orders }) {
  return (
    <>
      <Head>
        <title>My Account | Name Brand</title>
        <meta name="description" content="Name Brand My Account" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {session ? (
        <div className="py-5 lg:py-10 px-5 md:px-10 lg:mb-20">
          <div className="text-center">
            <h1 className="font-semibold pb-5 text-xl">
              Welcome back, {session.user.name}
            </h1>
            <h2 className="border-t border-b border-gray-100 py-5 lg:border-0 lg:mb-10">
              Your Email: {session.user.email}
            </h2>
          </div>
          {orders.length === 0 ? (
            <h3 className="text-center py-5">You haven't placed an order.</h3>
          ) : (
            <Orders orders={orders} />
          )}
        </div>
      ) : (
        <div className="">sing in</div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // get user credentials
  const session = await getSession(context);

  // redirect to sign in page if not signed in
  if (!session)
    return {
      redirect: { destination: "/signin", permanent: false },
      props: {},
    };

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get orders from firestore database, especially the order id
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // using data from firestore to retrieve order details from stripe checkout session
  // by passing in the id we saved to firestore during checkout to stripes .listLineItems method
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      // fetch items from stripe API, use expanding responses from stripe to get deeply nested product details from session
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
          expand: ["data.price.product"],
        })
      ).data,
    }))
  );

  return { props: { session, orders } };
}
