const { default: BannerGridCard } = require("./BannerGridCard");

export default function BannerGrid() {
  return (
    <div className="max-w-3xl my-0 mx-auto md:py-10 grid md:grid-cols-2 gap-5 md:gap-10">
      <BannerGridCard
        imageUrl={"/images/community.jpg"}
        heading={"Join The Name Brand Community"}
        tagline={"Connect with our followers and discover new friendships."}
      />
      <BannerGridCard
        imageUrl={"/images/app_store.jpg"}
        heading={"Discover The Latest Apps"}
        tagline={"Browse our extensive app store. We've got you covered."}
      />
      <BannerGridCard
        imageUrl={"/images/reward.jpg"}
        heading={"Claim Your Exclusive Rewards"}
        tagline={"Earn points when you shop with us and claim free rewards."}
      />
      <BannerGridCard
        imageUrl={"/images/tech_trend.jpg"}
        heading={"Check Out The Latest Tech"}
        tagline={
          "Get a sneak peek on our newest developments and upcoming products."
        }
      />
    </div>
  );
}
