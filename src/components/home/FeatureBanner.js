import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CurrencyFormat from "../ui/CurrencyFormat";

import ButtonDark from "../ui/ButtonDark";

export default function FeatureBanner({ products }) {
  const [selected, setSelected] = useState("Headphones");

  return (
    <div className=" max-w-3xl my-0 mx-auto p-5 bg-white h-250 sm:h-275 md:h-250 lg:h-200">
      <h1 className="text-xl mb-5 font-semibold text-center lg:text-left lg:m-5">
        Top Of The Range
      </h1>
      <div className="relative text-center pt-5 lg:text-left">
        {products.map(({ type }) => (
          <span
            key={type}
            className={`${
              selected === type
                ? `text-opacity-90`
                : `hover:text-opacity-40 text-opacity-20`
            } relative inline-block font-sans text-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black z-10 mx-1 mb-5 sm:mx-2 md:mx-5 cursor-pointer transition-all duration-500 `}
            onClick={() => setSelected(type)}
          >
            {type}
          </span>
        ))}
        {products.map(({ name, id, price, description, image, type }) => (
          <div
            key={id}
            className="absolute top-1/2 lg:3/4 left-0 right-0 mx-auto"
          >
            {selected === type && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, type: "tween" }}
                  className="w-4/5 md:w-1/2 lg:w-100 xl:w-128 mx-auto lg:mx-0 lg:absolute lg:-top-24 lg:left-32 2xl:left-64 2xl:-top-40"
                >
                  <Image
                    width={600}
                    height={600}
                    objectFit="contain"
                    src={image}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, type: "tween" }}
                  className="lg:absolute lg:w-2/5 lg:-right-0 lg:top-36"
                >
                  <h2 className="text-3xl font-semibold mt-5">{name}</h2>
                  <div className="mt-5 max-w-xs mx-auto lg:mx-0">
                    {description}
                  </div>
                  <div className="text-2xl mt-10">
                    <CurrencyFormat value={price} />
                  </div>
                  <div className="mt-5">
                    <Link href={`/products/${id}`}>
                      <a>
                        <ButtonDark text={"Buy now"} />
                      </a>
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
