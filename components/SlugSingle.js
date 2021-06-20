import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import ButtonDark from "../components/ui/ButtonDark";
import CurrencyFormat from "../components/ui/CurrencyFormat";

export default function SlugSingle({ product }) {
  const { id, name, price, description, image } = product;

  return (
    <div className="w-full flex flex-col bg-gray-50 sm:bg-white">
      <Link href={`/products/${id}`}>
        <a>
          <div className="bg-gray-50 grid place-items-center w-full">
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3 }}
              className="text-center w-2/3"
            >
              <Image src={image} width={300} height={300} objectFit="contain" />
            </motion.div>
          </div>
        </a>
      </Link>
      <div className="flex-1 flex flex-col justify-between p-5 text-center lg:text-left">
        <Link href={`/products/${id}`}>
          <a>
            <h2 className="text-lg md:text-xl font-semibold">{name}</h2>
          </a>
        </Link>
        <p className="text-sm my-5 mx-auto w-60 md:text-base md:my-10 lg:mx-0">
          {description}
        </p>
        <div>
          <div className="text-lg md:text-xl">
            <CurrencyFormat value={price} />
          </div>
          <div className="py-5 md:pt-7">
            <Link href={`/products/${id}`}>
              <a>
                <ButtonDark text={"Buy now"} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
