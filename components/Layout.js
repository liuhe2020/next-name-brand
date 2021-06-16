import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./Header";
import MobileNav from "./ui/MobileNav";
import Search from "./Search";
import Footer from "./Footer";

export default function Layout({ children, categories }) {
  const [navToggle, setNavToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const router = useRouter();

  // close toggle at router change
  useEffect(() => {
    const handleToggle = () => {
      setNavToggle(false), setSearchToggle(false);
    };

    router.events.on("routeChangeComplete", handleToggle);
    return () => {
      router.events.off("routeChangeComplete", handleToggle);
    };
  }, []);

  return (
    <>
      <Header
        navToggle={navToggle}
        setNavToggle={setNavToggle}
        setSearchToggle={setSearchToggle}
        categories={categories}
      />
      <AnimatePresence exitBeforeEnter>
        {navToggle && (
          <motion.div
            key="nav"
            className="w-full h-toggle absolute top-16 z-40 lg:h-toggle-lg lg:top-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileNav />
          </motion.div>
        )}
        {searchToggle && (
          <motion.div
            key="search"
            className="w-full h-toggle absolute top-16 z-30 lg:h-toggle-lg lg:top-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Search />
          </motion.div>
        )}
      </AnimatePresence>
      {!navToggle && !searchToggle && (
        <>
          {children}
          {/* Do not render Footer in signin, success & account pages */}
          {!(
            router.pathname.startsWith("{/success}") ||
            router.pathname.startsWith("/signin") ||
            router.pathname.startsWith("/account")
          ) && <Footer />}
        </>
      )}
    </>
  );
}
