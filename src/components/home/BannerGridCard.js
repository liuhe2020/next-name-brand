import Image from "next/image";
import ButtonLight from "../ui/ButtonLight";

export default function BannerGridCard(props) {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <Image width={900} height={540} objectFit="cover" src={props.imageUrl} />
      <div className="flex-1 flex flex-col justify-between items-start px-5 sm:px-10 pt-5 sm:pt-10 pb-10">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.heading}
        </h1>
        <div className="">
          <p className="my-5 sm:mb-10">{props.tagline}</p>
          <ButtonLight text={"Learn more"} />
        </div>
      </div>
    </div>
  );
}
