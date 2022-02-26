import { AnimatePresence, motion } from "framer-motion";

const BottomModal = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 z-50 flex h-fit w-[100vw] flex-col items-center justify-start border-t-2 bg-slate-900 px-4 pt-2 pb-32"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomModal;
