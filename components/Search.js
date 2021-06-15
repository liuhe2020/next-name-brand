import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";

import db from "../firebase";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm(e.target.input.value.toLowerCase().trim());
  };

  useEffect(() => {
    if (term) {
      const getProducts = async () => {
        const collection = await db.collection("products-all").get();
        const products = collection.docs.map((product) => ({
          name: product.data().name,
          id: product.id,
          image: product.data().image,
          keywords: product.data().keywords,
        }));
        const results = products.filter((product) =>
          product.keywords.includes(term)
        );
        setProducts(results);
      };
      getProducts();
    }
  }, [term]);

  return (
    <div className="flex flex-col items-center p-5 sm:p-10 ">
      <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
        <input
          type="text"
          name="input"
          className="border border-gray-400 rounded-full w-full py-3 pl-5 pr-12 focus:outline-none"
        />
        <button className="absolute w-6 right-3 top-3 text-gray-400">
          <SearchIcon />
        </button>
      </form>
      <div className="p-5">
        {products.map(({ id, name, image }) => (
          <div
            key={id}
            className="flex items-center border-b border-gray-100 py-2"
          >
            <Link href={`/products/${id}`}>
              <div className="cursor-pointer w-1/5 mr-3 sm:mr-5">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  objectFit="contain"
                />
              </div>
            </Link>
            <Link href={`/products/${id}`}>
              <a>
                <p className="">{name}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
