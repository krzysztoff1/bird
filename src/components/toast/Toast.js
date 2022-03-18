import { motion } from "framer-motion";

export const Toast = ({ mode, onClose, message }) => {
  console.log(mode);

  return (
    <motion.section
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -100 }}
      onClick={onClose}
      className={`${
        mode === "success" &&
        "border-green-700 bg-green-100 text-green-700 dark:border-green-300 dark:bg-green-200 dark:text-green-800"
      } ${
        mode === "info" &&
        "border-blue-700 bg-blue-100 text-blue-700 dark:border-blue-300 dark:bg-blue-200 dark:text-blue-800"
      }  mx-2 mb-2 w-[95vw] min-w-fit rounded-md border px-4 py-3 sm:w-64`}
      role="alert"
    >
      <p className="pr-8">{message}</p>
    </motion.section>
  );
};
