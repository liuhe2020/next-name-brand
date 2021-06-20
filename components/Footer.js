import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  const socialIconStyles = {
    width: "24px",
    height: "24px",
    marginRight: "10px",
  };

  return (
    <div className="w-full p-10">
      <div className="flex flex-col justify-center lg:flex-row">
        <div className="flex justify-center">
          <ul className="footer-ul">
            <li className="pb-5 font-semibold sm:text-lg text-black">SHOP</li>
            <li className="footer-li">
              <Link href="/">Online Shop FAQ</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Delivery Policy</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Return Policy</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Reward Policy</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Promo Conditions</Link>
            </li>
          </ul>
          <ul className="footer-ul">
            <li className="pb-5 font-semibold sm:text-lg text-black">
              SUPPORT
            </li>
            <li className="footer-li">
              <Link href="/">Contact Us</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Warranty Policy</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Repairs</Link>
            </li>
            <li className="footer-li">
              <Link href="/">My Orders</Link>
            </li>
            <li className="footer-li">
              <Link href="/">My Account</Link>
            </li>
          </ul>
          <ul className="footer-ul">
            <li className="pb-5 font-semibold sm:text-lg text-black">ABOUT</li>
            <li className="footer-li">
              <Link href="/">About Us</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Careers</Link>
            </li>
            <li className="footer-li">
              <Link href="/">News</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Community</Link>
            </li>
            <li className="footer-li">
              <Link href="/">Environment</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center lg:items-start sm:pt-12 pt-7 lg:pt-0 md:mx-5 xl:mx-10 2xl:mx-14">
          <p className="pb-5 font-semibold sm:text-lg text-black">SOCIAL</p>
          <div className="">
            <SocialIcon
              url="https://twitter.com"
              target="_blank"
              bgColor="#9CA3AF"
              style={socialIconStyles}
            />
            <SocialIcon
              url="https://facebook.com"
              target="_blank"
              bgColor="#9CA3AF"
              style={socialIconStyles}
            />
            <SocialIcon
              url="https://instagram.com"
              target="_blank"
              bgColor="#9CA3AF"
              style={socialIconStyles}
            />
            <SocialIcon
              url="https://youtube.com"
              target="_blank"
              bgColor="#9CA3AF"
              style={socialIconStyles}
            />
            <SocialIcon
              url="https://linkedin.com"
              target="_blank"
              bgColor="#9CA3AF"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          <div className="pt-8 lg:pt-16">
            <img src="/images/visa.png" className="inline-block h-4 mr-3" />
            <img
              src="/images/mastercard.png"
              className="inline-block h-6 mr-3"
            />
            <img src="/images/amex.png" className="inline-block h-6 mr-3" />
            <img src="/images/paypal.png" className="inline-block h-5" />
          </div>
        </div>
      </div>
      <p className="max-w-2xl mx-auto text-center text-gray-500 text-xs pt-10 sm:text-sm md:pt-20 lg:pb-10">
        &copy; 2021 NAME BRAND.
        <br />
        <br />
        Disclaimer: This webiste is a demo. All displayed products are fake and
        the Stripe payment system is in test mode. No real transactions are
        taking place. This is a personal project for educational purposes only.
      </p>
    </div>
  );
}
