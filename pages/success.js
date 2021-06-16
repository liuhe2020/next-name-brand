import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Head from "next/head";

import ButtonDark from "../components/ui/ButtonDark";
import { emptyBasket } from "../components/redux/basketSlice";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyBasket());
  }, []);

  return (
    <>
      <Head>
        <title>Order Confirmation | Name Brand</title>
        <meta name="description" content="Name Brand Sign In" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md mx-auto px-5 py-20 sm:px-16 sm:py-28">
        <h1 className="text-xl font-semibold">Order Confirmation</h1>
        <p className="py-10">
          Thank you for your order! A confirmation has been sent to your email.
          You may also check your order in the account section of our website.
        </p>

        <div className="pb-20">
          <Link href="/account">
            <a>
              <ButtonDark text={"Go to my order"} />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
