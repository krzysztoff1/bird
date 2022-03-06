import { useState, useRef, useEffect } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { AnimatePresence, motion, useDomEvent } from "framer-motion";
import "./photo.css";

const PostImage = ({ averageColor, imageUrl, thumbnailUrl, id }) => {
  const [isOpen, setOpen] = useState(false);

  useDomEvent(useRef(window), "scroll", () => isOpen && setOpen(false));

  const transition = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };

  return (
    <>
      <motion.div
        onClick={() => setOpen(!isOpen)}
        transition={transition}
        style={{ backgroundColor: averageColor?.hex }}
        className={`image-container ${isOpen && "open"}`}
      >
        <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
          {(src) => (
            <motion.img
              className="image-zoom"
              layout
              src={src}
              alt="Post photo"
            />
          )}
        </ProgressiveImage>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.header
            initial={{ y: -100 }}
            exit={{ y: -100 }}
            animate={{ y: 0 }}
            transition={transition}
            className="fixed top-4 left-0 right-0 z-[201] flex  w-full justify-between"
          >
            <button
              onClick={() => setOpen(!isOpen)}
              className="mx-4 rounded-full bg-slate-100/50 p-2 backdrop-blur-md transition-all hover:bg-white/25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <button className="mx-4 rounded-full p-2 backdrop-blur-md transition-all hover:bg-white/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </motion.header>
        )}
      </AnimatePresence>
    </>

    // <section>
    //   <motion.div
    //     onClick={() => setOpen(!isOpen)}
    //     layout
    //     transition={transition}
    //     style={{ backgroundColor: averageColor }}
    //     className={`
    //       relative w-full overflow-hidden rounded-xl`}
    //   >
    //     <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
    //       {(src) => (
    //         <motion.img
    //           className={`${
    //             isOpen &&
    //             "fixed top-0 left-0 right-0 bottom-0 max-h-screen w-screen"
    //           }`}
    //           src={src}
    //           alt=""
    //         />
    //       )}
    //     </ProgressiveImage>
    //   </motion.div>
    // </section>
  );
};

export default PostImage;
