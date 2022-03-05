import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import Spinner from "../components/loaders/Spinner";
import { getPostById } from "../services/firebase";
import ProgressiveImage from "react-progressive-graceful-image";

const Photo = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    getPostById(id).then((res) => {
      setPhoto(res);
    });
  }, [id]);

  if (!photo) return <Spinner />;

  return (
    <>
      <header className="fixed top-4 z-40 flex w-full justify-between">
        <button
          onClick={() => window.history.go(-1)}
          className="mx-4 rounded-full p-2 backdrop-blur-md transition-all hover:bg-white/25"
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
      </header>
      <section
        style={{ backgroundColor: photo.averageColor?.hex }}
        className="fixed flex h-screen w-screen items-center justify-center"
      >
        <ProgressiveImage src={photo.imageUrl} placeholder={photo.thumbnailUrl}>
          {(src) => <img className="w-full" src={src} alt="" />}
        </ProgressiveImage>
      </section>
    </>
  );
};

export default Photo;
