import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ButtonDark from "../ui/ButtonDark";
import ButtonLight from "../ui/ButtonLight";

export default function Banner() {
  return (
    <div className="max-w-3xl mx-auto bg-white">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showThumbs={false}
      >
        {/* --------------------------------------------slide full---------------------------------------------- */}
        <div className="flex flex-col justify-center items-center h-full md:flex-row relative">
          <div className="flex-1 w-full">
            <img
              src="/images/banner-4.jpg"
              alt="banner"
              className="h-full object-cover"
            />
          </div>
          <div className="absolute px-10 pb-12 top-20 lg:px-20 xl:px-28 text-gray-100 2xl:pb-28 2xl:top-24">
            <h1 className="font-semibold pt-10 text-xl md:pt-0 lg:text-3xl">
              No Name MeBook S12
            </h1>
            <h2 className="font-semibold text-2xl py-5 sm:py-8 md:py-4 lg:text-5xl lg:pb-14 2xl:py-10 md:w-72 lg:w-110">
              Unlimited Power In Your Hands
            </h2>
            <Link href="/products/no_name_mebook_s12">
              <a className="pb-10">
                <ButtonLight text={"Learn more"} />
              </a>
            </Link>
          </div>
        </div>
        {/* --------------------------------------------slide split---------------------------------------------- */}
        <div className="h-full flex flex-col justify-center items-center bg-black md:flex-row-reverse md:bg-white">
          <div className="w-full md:w-1/2">
            <img
              src="/images/banner-1.jpg"
              alt="banner"
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 md:w-1/2 px-10 pb-12 md:text-left lg:pb-0 lg:px-20 xl:pb-20 xl:px-28 text-gray-100 md:text-black">
            <h1 className="font-semibold pt-10 text-xl md:pt-0 lg:text-3xl">
              No Name GameBook Plus 17
            </h1>
            <h2 className="font-semibold text-2xl py-5 sm:py-8 lg:text-5xl lg:pb-14">
              Unleash The Ultimate Experience
            </h2>
            <Link href="/products/no_name_gamebook_17">
              <div>
                <a className="pb-10 hidden md:block">
                  <ButtonDark text={"Learn more"} />
                </a>
                <a className="pb-10 md:hidden">
                  <ButtonLight text={"Learn more"} />
                </a>
              </div>
            </Link>
          </div>
        </div>
        {/* --------------------------------------------slide full---------------------------------------------- */}
        <div className="flex flex-col justify-center items-center h-full md:flex-row relative">
          <div className="flex-1 w-full">
            <img
              src="/images/banner-3.jpg"
              alt="banner"
              className="h-full object-cover"
            />
          </div>
          <div className="absolute px-10 pb-12 top-1/3 lg:px-20 xl:px-28 text-gray-100 2xl:pb-28">
            <h1 className="font-semibold pt-10 text-xl md:pt-0 lg:text-3xl">
              No Name Watch 3 Pro
            </h1>
            <h2 className="font-semibold text-2xl py-5 sm:py-8 md:py-4 md:w-72 md:px-12 lg:text-5xl lg:pb-14 2xl:py-10 lg:w-115 lg:px-10">
              Perceive Time The Smart Way
            </h2>
            <Link href="/products/no_name_watch_3_pro">
              <a className="pb-10">
                <ButtonLight text={"Learn more"} />
              </a>
            </Link>
          </div>
        </div>
        {/* --------------------------------------------slide split---------------------------------------------- */}
        <div className="h-full flex flex-col justify-center items-center bg-black md:flex-row md:bg-white">
          <div className="w-full md:w-1/2">
            <img
              src="/images/banner-2.jpg"
              alt="banner"
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 md:w-1/2 px-10 pb-12 md:text-left lg:pb-0 lg:px-20 xl:pb-20 xl:px-28 text-gray-100 md:text-black">
            <h1 className="font-semibold pt-10 text-xl md:pt-0 lg:text-3xl">
              No Name DBS-3 ANC
            </h1>
            <h2 className="font-semibold text-2xl py-5 sm:py-8 lg:text-5xl lg:pb-14">
              Immerse Yourself In Sound
            </h2>
            <Link href="/products/no_name_dbs3_anc">
              <div>
                <a className="pb-10 hidden md:block">
                  <ButtonDark text={"Learn more"} />
                </a>
                <a className="pb-10 md:hidden">
                  <ButtonLight text={"Learn more"} />
                </a>
              </div>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
