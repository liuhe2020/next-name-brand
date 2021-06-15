import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, MinusSmIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import {
  addToBasket,
  removeFromBasket,
  reduceBasket,
  selectItems,
  selectBasketQty,
  selectBasketSubtotal,
} from "../components/redux/basketSlice";
import ButtonDark from "../components/ui/ButtonDark";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {
  const basketItems = useSelector(selectItems);
  const basketQty = useSelector(selectBasketQty);
  const basketSubtotal = useSelector(selectBasketSubtotal);
  const dispatch = useDispatch();
  const [session] = useSession();

  const checkoutSession = async () => {
    const stripe = await stripePromise;

    // call backend(api folder) to create checkout session and send data
    const stripeSession = await axios.post("/api/checkout-session", {
      basketItems,
      email: session.user.email,
    });

    // redirect to stripe checkout page
    const res = await stripe.redirectToCheckout({
      sessionId: stripeSession.data.id,
    });

    if (res.error) alert(res.error.message);
  };

  return (
    <>
      <Head>
        <title>Check Out | Name Brand</title>
        <meta name="description" content="Name Brand Check Out" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="min-h-screen max-w-screen-xl mx-auto lg:mb-20">
        <h1 className="font-semibold py-5 text-center text-xl lg:py-10">
          {basketItems.length === 0
            ? "Your shopping basket is empty."
            : "Shopping basket"}
        </h1>
        {basketItems.length > 0 && (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 mx-5 md:mx-10 lg:bg-gray-50 lg:min-h-128">
              <h3 className="border-t border-gray-100 text-gray-600 py-5 sm:pl-10">
                {basketQty === 1 ? `${basketQty} Item` : `${basketQty} Items`}
              </h3>
              {basketItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-t border-gray-100 py-5 text-sm sm:p-10 sm:text-base"
                >
                  <div className="w-2/3 flex sm:w-3/4">
                    <div className="w-1/3">
                      <Link href={`/products/${item.id}`}>
                        <a>
                          <Image
                            src={item.image}
                            width={400}
                            height={400}
                            objectFit="contain"
                          />
                        </a>
                      </Link>
                    </div>
                    <h2 className="w-2/3 font-semibold px-3 pt-9 sm:pl-10">
                      {item.name}
                    </h2>
                  </div>
                  <div className="w-1/4 flex flex-col font-semibold items-end">
                    <div className="mb-3">
                      <Currency quantity={item.price} currency={"GBP"} />
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs sm:text-sm">Qty:</p>
                      <div className="flex border border-gray-200 rounded justify-around items-center w-20 h-8 ml-3">
                        <MinusSmIcon
                          className="w-4 cursor-pointer"
                          onClick={() => dispatch(reduceBasket(item))}
                        />
                        <span className="">{item.quantity}</span>
                        <PlusIcon
                          className="w-4 cursor-pointer"
                          onClick={() => dispatch(addToBasket(item))}
                        />
                      </div>
                    </div>
                    <div className="mt-3 mb-6">
                      <Currency
                        quantity={item.price * item.quantity}
                        currency={"GBP"}
                      />
                    </div>
                    <p
                      className="text-xs font-semibold text-gray-500 hover:text-black cursor-pointer sm:text-sm"
                      onClick={() => dispatch(removeFromBasket(item))}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 mx-5 my-10 px-5 py-10 font-semibold md:mx-10 md:px-10 lg:w-1/3 lg:bg-gray-50 lg:self-start lg:m-0 lg:mr-10">
              <h2 className="">Summary</h2>
              <div className="flex justify-between items-center border-b border-gray-200 pt-3 pb-8">
                <span className="">Voucher</span>
                <input
                  type="text"
                  className="border border-gray-300 rounded outline-none p-2 w-1/3 h-8"
                />
              </div>
              <div className="my-6 lg:mb-10">
                <div className="flex justify-between">
                  <h2 className="">Subtotal</h2>
                  <Currency quantity={basketSubtotal} currency={"GBP"} />
                </div>
                <h3 className="text-gray-500 text-sm">(Including VAT)</h3>
              </div>
              <div className="text-center">
                <ButtonDark
                  text={session ? "Check out" : "Sign in to checkout"}
                  role="link"
                  action={checkoutSession}
                  disabled={session ? false : true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
