import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";

import db from "../../firebase";
import ButtonDark from "../../components/ui/ButtonDark";
import ButtonLight from "../../components/ui/ButtonLight";
import { addToBasket } from "../../components/redux/basketSlice";

export default function Product({ product }) {
  const { name, price, description, image } = product;

  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>{name} | Name Brand</title>
        <meta name="description" content={`Name Brand ${name}`} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="max-w-3xl mx-auto flex flex-col justify-center items-center md:flex-row md:mb-10">
        <div className="grid place-items-center w-full bg-gray-50 md:w-1/2 h-115 md:my-10 md:ml-10 xl:h-150">
          <div className="w-2/3 sm:w-1/2 md:w-3/4 lg:w-2/3 xl:w-7/12">
            <Image src={image} width={600} height={600} objectFit="contain" />
          </div>
        </div>
        <div className="flex py-10 md:w-1/2 md:h-115 md:justify-center md:items-center xl:h-150">
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">{name}</h2>
            <p className="text-sm my-5 mx-auto w-64 sm:text-base md:my-10 md:mx-0">
              {description}
            </p>
            <div className="text-lg sm:text-xl">
              <Currency quantity={price} currency="GBP" />
            </div>
            <div className="py-5 md:pt-7">
              <ButtonDark
                text={"Add to cart"}
                margin={"mr-5"}
                action={() => dispatch(addToBasket(product))}
              />
              <Link href="/checkout">
                <a>
                  <ButtonLight text={"Go to checkout"} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const getProducts = await db.collection("products-all").get();

  const paths = getProducts.docs.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const getProduct = await db.collection("products-all").doc(id).get();

  const product = {
    id: getProduct.id,
    name: getProduct.data().name,
    price: getProduct.data().price,
    description: getProduct.data().description,
    image: getProduct.data().image,
  };

  return {
    props: { product },
  };
}
