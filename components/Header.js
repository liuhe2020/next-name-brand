import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  SearchIcon,
  UserIcon,
  ShoppingBagIcon,
  MenuAlt3Icon,
  XIcon,
} from "@heroicons/react/outline";

import { selectBasketQty } from "../components/redux/basketSlice";

export default function Header({ navToggle, setNavToggle, setSearchToggle }) {
  const [navBar, setNavBar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef();

  const basketQty = useSelector(selectBasketQty);
  const [session] = useSession();

  const router = useRouter();

  const handleSignIn = () => {
    session ? router.push("/account") : signIn();
    setDropDown(false);
  };

  const handleSignOut = () => {
    session ? signOut() : signIn();
    setDropDown(false);
  };

  // listening for scroll event to fire navBar state change
  useEffect(() => {
    // if scrolled down, change state of navBar
    const navTransition = () =>
      window.scrollY > 0 ? setNavBar(true) : setNavBar(false);

    window.addEventListener("scroll", navTransition);
    return () => window.removeEventListener("scroll", navTransition);
  }, []);

  // listen for click event to close dropdown menu
  // useEffect(() => {
  //   // if clicked outside dropdown, close it
  //   const closeDropDown = (e) =>
  //     e.target.closest("div") !== dropDownRef.current && setDropDown(false);

  //   window.addEventListener("click", closeDropDown);
  //   return () => window.removeEventListener("click", closeDropDown);
  // }, []);

  return (
    <div
      className={`${
        navBar ? "lg:shadow-sm" : `lg:bg-gray-50 lg:shadow-none`
      } sticky z-50 top-0 w-full h-16 shadow-sm bg-white lg:h-20 transition-all`}
    >
      <div className="mx-auto max-w-3xl flex justify-between items-center h-full px-5 md:px-10">
        <Link href="/">
          <a>
            <Image
              width={110}
              height={38}
              layout="fixed"
              src="/images/name_brand_logo.png"
              className="cursor-pointer"
            />
          </a>
        </Link>
        <ul className="hidden font-semibold lg:flex">
          <li className="px-4">
            <Link href="/categories/laptops">Laptops</Link>
          </li>
          <li className="px-4">
            <Link href="/categories/smartphones">
              <a>Smartphones</a>
            </Link>
          </li>
          <li className="px-4">
            <Link href="/categories/tablets">
              <a>Tablets</a>
            </Link>
          </li>
          <li className="px-4">
            <Link href="/categories/audio">
              <a>Audio</a>
            </Link>
          </li>
          <li className="px-4">
            <Link href="/categories/wearables">
              <a>Wearables</a>
            </Link>
          </li>
        </ul>
        <div className="flex align-self-end text-gray-400">
          <SearchIcon
            onClick={() => setSearchToggle((prev) => !prev)}
            className="cursor-pointer w-6"
          />
          <div className="relative" ref={dropDownRef}>
            <UserIcon
              className="cursor-pointer w-6 ml-3"
              onClick={() => setDropDown((prev) => !prev)}
            />
            <ul
              className={`${
                dropDown ? "block" : "hidden"
              } absolute bg-white border shadow-md w-28 mt-3 p-2 -right-2 top-5`}
            >
              <li
                onClick={handleSignIn}
                className="mx-2 pb-1.5 pl-2 cursor-pointer border-b border-gray-200"
              >
                {session ? "Account" : "Sign in"}
              </li>
              <li
                onClick={handleSignOut}
                className="mx-2 pt-1.5 pl-2 cursor-pointer"
              >
                {session ? "Sign out" : "Register"}
              </li>
            </ul>
          </div>
          <Link href="/checkout">
            <div className="relative cursor-pointer w-6 ml-3 flex items-center">
              <ShoppingBagIcon />
              {basketQty > 0 && (
                <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 text-xs text-center text-white bg-red-600 rounded-full">
                  {basketQty}
                </span>
              )}
            </div>
          </Link>
          {/* <MenuAlt3Icon
            onClick={() => setNavToggle(true)}
            className={`${
              navToggle && "hidden"
            } cursor-pointer w-7 ml-4 lg:hidden`}
          />
          <XIcon
            onClick={() => setNavToggle(false)}
            className={`${
              !navToggle && "hidden"
            } cursor-pointer w-7 ml-4 lg:hidden`}
          /> */}
        </div>
      </div>
    </div>
  );
}
