import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import moment from "moment";

import db from "../../firebase";
import SlugSingle from "../../components/SlugSingle";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

export default function Category({ slug, products }) {
  // capitalize category slug for the Head & h1 heading
  const category = slug.charAt(0).toUpperCase() + slug.slice(1);

  const router = useRouter();
  const dropDownRef = useRef();

  const [isActive, setIsActive] = useState(false);
  const [sorting, setSorting] = useState("Sort");

  // rearranging the products array according to sort parameters
  const sortNewest = (e) => {
    setSorting(e.target.textContent);
    setIsActive(!isActive);
    products.sort((a, b) => b.date_added - a.date_added);
  };

  const sortHighToLow = (e) => {
    setSorting(e.target.textContent);
    setIsActive(!isActive);
    products.sort((a, b) => b.price - a.price);
  };

  const sortLowToHigh = (e) => {
    setSorting(e.target.textContent);
    setIsActive(!isActive);
    products.sort((a, b) => a.price - b.price);
  };

  const sortAToZ = (e) => {
    setSorting(e.target.textContent);
    setIsActive(!isActive);
    products.sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  // reset UI when route changes
  useEffect(() => {
    const handleSorting = () => {
      setIsActive(false);
      setSorting("Sort");
    };

    router.events.on("routeChangeStart", handleSorting);
    return () => {
      router.events.off("routeChangeStart", handleSorting);
    };
  }, []);

  // listen for click event to close dropdown
  useEffect(() => {
    // if clicked outside dropdown, close it
    const closeDropDown = (e) => {
      e.target.closest("div") !== dropDownRef.current && setIsActive(false);
    };

    window.addEventListener("click", closeDropDown);
    return () => window.removeEventListener("click", closeDropDown);
  }, []);

  return (
    <>
      <Head>
        <title>{category} | Name Brand</title>
        <meta name="description" content={`Name Brand ${category}`} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="max-w-3xl min-h-screen mx-auto p-5 md:p-10">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl">{category}</h1>
          {/* ------------------------------------sort component start--------------------------------------- */}
          <div className="relative">
            <div
              ref={dropDownRef}
              onClick={() => setIsActive(!isActive)}
              className="cursor-pointer flex justify-between"
            >
              <p className="pr-2">{sorting}</p>
              <ChevronDownIcon
                className={`${!isActive ? "block" : "hidden"} w-5`}
              />
              <ChevronUpIcon
                className={`${isActive ? "block" : "hidden"} w-5`}
              />
            </div>
            <ul
              className={`${
                isActive ? "block" : "hidden"
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
          {/* ------------------------------------sort component end--------------------------------------- */}
        </div>
        <div className="py-8 md:py-12 grid gap-5 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <SlugSingle key={product.id} product={product} />
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
