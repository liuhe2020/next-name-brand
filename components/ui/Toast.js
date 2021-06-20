import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { XIcon } from "@heroicons/react/solid";
import { selectItems } from "../redux/basketSlice";

export default function Toast({ isToast, setIsToast }) {
  const basketItems = useSelector(selectItems);

  useEffect(() => {
    if (!isToast) return;
    const timeoutId = setTimeout(() => setIsToast(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [basketItems]);

  return (
    <AnimatePresence>
      {isToast && (
        <motion.div
          initial={{ x: 160 }}
          animate={{ x: 0 }}
          exit={{ x: 160 }}
          transition={{ duration: 0.5 }}
          className="absolute right-1 bottom-0 grid place-items-center bg-black shadow-md w-40 h-12 md:bottom-3"
        >
          <XIcon
            onClick={() => setIsToast(false)}
            className="absolute top-0 left-0 cursor-pointer w-5 text-white"
          />
          <p className="text-gray-100 font-semibold text-sm ml-2">
            Added to basket
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
