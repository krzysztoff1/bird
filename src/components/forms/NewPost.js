import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";
import { CircularProgressbar } from "react-circular-progressbar";

const NewPost = () => {
  const [text, setText] = useState(String);
  const [user, setUser] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      uploadPost({ text });
      return;
    }
    uploadPostWithImage({ text, file });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="z-50 mx-auto flex h-full w-full flex-col items-start justify-between bg-slate-900"
    >
      <div className="mt-6 w-full px-3">
        <div className="flex w-full justify-between">
          <p className="p-3 font-bold text-slate-100">Return</p>
          <button
            type="submit"
            className="m-3 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Post
          </button>
        </div>
        <div className="mt-4 flex w-full px-3">
          <img
            className="h-12 w-12 flex-none rounded-full"
            src={user ? user.photoURL : null}
            alt=""
            srcset=""
          />
          <textarea
            rows="8"
            onChange={(e) => setText(e.target.value)}
            className="text-md flex-grow-2 block w-full rounded-lg bg-transparent px-5 py-8 pt-0 text-slate-100 outline-none"
            placeholder="Whaazzzaz Upppp"
          />
        </div>
      </div>
      <div className="w-full border">
        <div className="w-full">
          <svg
            class="h-6 w-6"
            fill="blue"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="flex w-full">
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="h-6 w-6"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="h-6 w-6"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
              clip-rule="evenodd"
            ></path>
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
          </svg>
          <svg
            class="h-6 w-6"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <CircularProgress
            variant="determinate"
            value={Math.trunc((text.length / 280) * 100)}
          />
          <svg
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      {/* <div className="mr-3 flex w-full">
        <textarea
          rows="1"
          onChange={(e) => setText(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50/20 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700/25 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Whaazzzaz Upppp"
        />
        <CircularProgress
          variant="determinate"
          value={Math.trunc((text.length / 280) * 100)}
        />
      </div>
      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      <button
        type="submit"
        className="mr-2 mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post
      </button> */}
    </form>
  );
};

export default NewPost;
