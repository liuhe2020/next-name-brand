import Head from "next/head";

import db from "../firebase";
import Banner from "../components/home/Banner";
import Feature from "../components/home/Feature";
import FeatureBanner from "../components/home/FeatureBanner";
import BannerGrid from "../components/home/BannerGrid";

export default function Home({ featureBannerProducts, featureProducts }) {
  return (
    <div className="bg-gray-50 sm:px-5 pb-10 md:px-10">
      <Head>
        <title>Name Brand</title>
        <meta name="description" content="Name Brand online store" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Banner />
      <Feature products={featureProducts} />
      <FeatureBanner products={featureBannerProducts} />
      <BannerGrid />
    </div>
  );
}

export async function getStaticProps() {
  const getProducts = async (category) => {
    const products = await db
      .collection("products")
      .doc("categories")
      .collection(category)
      .orderBy("date_added", "asc")
      .get();

    return products.docs.map((product) => ({
      name: product.data().name,
      id: product.id,
      price: product.data().price,
      description: product.data().description,
      image: product.data().image,
      type: product.data().type,
    }));
  };

  const featureProducts = await getProducts("feature");
  const featureBannerProducts = await getProducts("feature-banner");

  return {
    props: { featureProducts, featureBannerProducts },
  };
}
