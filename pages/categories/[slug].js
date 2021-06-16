import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";

import db from "../../firebase";
import ButtonDark from "../../components/ui/ButtonDark";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import CurrencyFormat from "../../components/ui/CurrencyFormat";

export default function Category({ slug, products }) {
  // capitalize category slug for the Head & h1 heading
  const category = slug.charAt(0).toUpperCase() + slug.slice(1);

  const router = useRouter();

  const [active, setActive] = useState(false);
  const [sorting, setSorting] = useState("Sort");

  const sortNewest = (e) => {
    setSorting(e.target.textContent);
    setActive(!active);
    products.sort((a, b) => b.date_added - a.date_added);
  };

  const sortHighToLow = (e) => {
    setSorting(e.target.textContent);
    setActive(!active);
    products.sort((a, b) => b.price - a.price);
  };

  const sortLowToHigh = (e) => {
    setSorting(e.target.textContent);
    setActive(!active);
    products.sort((a, b) => a.price - b.price);
  };

  const sortAToZ = (e) => {
    setSorting(e.target.textContent);
    setActive(!active);
    products.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  useEffect(() => {
    const handleSorting = () => {
      setActive(false), setSorting("Sort");
    };

    router.events.on("routeChangeStart", handleSorting);
    return () => {
      router.events.off("routeChangeStart", handleSorting);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{category} | Name Brand</title>
        <meta name="description" content={`Name Brand ${category}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl min-h-screen mx-auto p-5 md:p-10">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl">{category}</h1>
          <div className="relative">
            <div
              onClick={() => setActive(!active)}
              className="cursor-pointer flex justify-between"
            >
              <p className="pr-2">{sorting}</p>
              <ChevronDownIcon
                className={`${!active ? "block" : "hidden"} w-5`}
              />
              <ChevronUpIcon className={`${active ? "block" : "hidden"} w-5`} />
            </div>
            <ul
              className={`${
                active ? "block" : "hidden"
              } absolute top-6 right-0 bg-white border shadow-md w-40 py-2 mt-2 z-10`}
            >
              <li
                onClick={sortNewest}
                className="cursor-pointer py-1 px-3 hover:bg-gray-100"
              >
                Newest
              </li>
              <li
                onClick={sortHighToLow}
                className="cursor-pointer py-1 px-3 hover:bg-gray-100"
              >
                Price: High to Low
              </li>
              <li
                onClick={sortLowToHigh}
                className="cursor-pointer py-1 px-3 hover:bg-gray-100"
              >
                Price: Low to High
              </li>
              <li
                onClick={sortAToZ}
                className="cursor-pointer py-1 px-3 hover:bg-gray-100"
              >
                Default: A to Z
              </li>
            </ul>
          </div>
        </div>
        <div className="py-8 md:py-12 grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(({ name, id, price, description, image }) => (
            <div
              key={id}
              className="w-full flex flex-col bg-gray-50 sm:bg-white"
            >
              <Link href={`/products/${id}`}>
                <a>
                  <div className="bg-gray-50 grid place-items-center w-full">
                    <motion.div
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.3 }}
                      className="text-center w-2/3"
                    >
                      <Image
                        src={image}
                        width={300}
                        height={300}
                        objectFit="contain"
                      />
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
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const categories = await db.collection("products").doc("categories").get();

  const paths = categories.data().name.map((category) => ({
    params: { slug: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const getProducts = await db
    .collection("products")
    .doc("categories")
    .collection(slug)
    .get();

  const products = getProducts.docs.map((product) => ({
    id: product.id,
    name: product.data().name,
    price: product.data().price,
    description: product.data().description,
    image: product.data().image,
    date_added: moment(product.data().date_added.toDate()).unix(),
  }));

  return {
    props: { slug, products },
  };
}
