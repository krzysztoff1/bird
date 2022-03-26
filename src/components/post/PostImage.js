import { useState, useEffect } from "react";
import ProgressiveImage from "react-progressive-graceful-image";

const PostImage = ({ averageColor, imageUrl, thumbnailUrl, id }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) return (document.body.style.overflow = "hidden");
    document.body.style.overflow = "visible";
  }, [isOpen]);

  return (
    <div
      onClick={() => setOpen(!isOpen)}
      className={`${
        isOpen
          ? "fixed top-0 right-0 bottom-0 left-0 z-[1000] mt-0 h-screen w-screen"
          : "mt-3"
      } w-full bg-slate-900 bg-opacity-50 object-cover`}
      style={{ background: averageColor?.rgba.slice(0, -2) + "0.9)" }}
    >
      {isOpen && (
        <nav className="fixed top-0 mx-auto w-full p-3">
          <button
            onClick={() => setOpen(false)}
            className={`${
              !averageColor?.isDark ? "hover:bg-white/10" : "hover:bg-black/10"
            } h-8 w-8 rounded-full p-1 transition-all hover:bg-white/5 hover:shadow`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                averageColor?.isDark ? "text-white" : "text-black"
              } h-6 w-6`}
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
        </nav>
      )}
      <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
        {(src) => (
          <img
            className={`${
              isOpen && "object-contain"
            } h-full w-full overflow-hidden rounded-xl`}
            src={src}
            alt="post"
          />
        )}
      </ProgressiveImage>
    </div>
  );
};

export default PostImage;
