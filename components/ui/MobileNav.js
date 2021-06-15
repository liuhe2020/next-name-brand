import Link from "next/link";

export default function MobileNav() {
  return (
    <ul className="flex flex-col items-center w-full bg-white py-8 text-3xl font-semibold lg:hidden">
      <li className="py-8">
        <Link href="/categories/laptops">Laptops</Link>
      </li>
      <li className="py-8">
        <Link href="/categories/smartphones">
          <a>Smartphones</a>
        </Link>
      </li>
      <li className="py-8">
        <Link href="/categories/tablets">
          <a>Tablets</a>
        </Link>
      </li>
      <li className="py-8">
        <Link href="/categories/audio">
          <a>Audio</a>
        </Link>
      </li>
      <li className="py-8">
        <Link href="/categories/wearables">
          <a>Wearables</a>
        </Link>
      </li>
    </ul>
  );
}
