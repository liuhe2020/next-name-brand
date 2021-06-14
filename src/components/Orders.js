import Image from "next/image";
import moment from "moment";
import Currency from "react-currency-formatter";

export default function Orders({ orders }) {
  return (
    <div className="">
      {orders.map(({ id, amount, amountShipping, items, timestamp }) => (
        <div
          key={id}
          className="max-w-md mx-auto flex flex-col py-5 border-b border-gray-100 sm:p-10 lg:bg-gray-50"
        >
          <div className="py-5 text-sm font-semibold sm:text-base sm:flex sm:justify-between">
            <div>
              <h3 className="lg:pb-2">Order number: {id.slice(8, 18)}</h3>
              <h3 className="">
                Order date: {moment.unix(timestamp).format("DD MMM YYYY")}
              </h3>
            </div>
            <div>
              <div className="lg:pb-2">
                <span className="">Order total: </span>
                <Currency quantity={amount} currency={"gbp"} />
              </div>
              <h3 className="">
                Shipping: {amountShipping === 0 ? "Free" : amountShipping}
              </h3>
            </div>
          </div>
          <div className="">
            {items.map(({ id, amount_total, quantity, price }) => (
              <div
                key={id}
                className="flex justify-between items-center py-1 text-sm sm:text-base"
              >
                <div className="w-20 sm:w-24">
                  <Image
                    src={price.product.images[0]}
                    width={200}
                    height={200}
                    objectFit="contain"
                  />
                </div>
                <p className="w-1/3 sm:w-1/2">No Name Navigator X Smartwatch</p>
                <p className="">Qty: {quantity}</p>
                <Currency quantity={amount_total / 100} currency={"gbp"} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
