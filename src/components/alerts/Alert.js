import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Alert = ({ title, text, success, info }) => {
  const [open, toggleOpen] = useState(true);

  setTimeout(() => {
    toggleOpen(false);
  }, 2500);

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          exit={{ y: -200 }}
          transition={{ type: "spring" }}
          className="fixed left-0 right-0 top-2 z-[100] w-screen md:top-4"
        >
          <div
            className={`${
              success &&
              "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800"
            } ${
              info &&
              "bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-800"
            } mx-auto mb-4 max-w-md rounded-lg  p-4 text-sm `}
            role="alert"
          >
            <span className="font-medium">{title} </span>
            {text}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Alert;
