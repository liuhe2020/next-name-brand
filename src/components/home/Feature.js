import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Currency from "react-currency-formatter";
import ButtonDark from "../ui/ButtonDark";

export default function Feature({ products }) {
  return (
    <div className="max-w-3xl my-0 mx-auto py-5 md:py-10 grid md:grid-cols-2 gap-5 md:gap-10">
      {products.map(({ name, id, price, description, image }) => (
        <div
          key={id}
          className="relative flex flex-col w-full h-115 lg:h-128 bg-white p-10"
        >
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-xl md:text-lg lg:text-3xl font-semibold">
              {name}
            </h2>
            <div className="text-sm sm:text-base md:text-sm lg:text-base flex-1 w-1/2 mt-8 md:w-3/5 lg:w-1/2">
              {description}
            </div>
            <div className="text-xl md:text-2xl lg:text-3xl my-5 md:my-8">
              <Currency quantity={price} currency="GBP" />
            </div>
            <Link href={`/products/${id}`}>
              <a>
                <ButtonDark text={"Buy now"} />
              </a>
            </Link>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute w-1/2 bottom-28 sm:bottom-16 md:bottom-24 xl:bottom-4 right-0 md:-right-5 drop-shadow-2xl filter"
          >
            <Link href={`/products/${id}`}>
              <a>
                <Image
                  src={image}
                  width={400}
                  height={400}
                  objectFit="contain"
                />
              </a>
            </Link>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
