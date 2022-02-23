import { useState } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";

const NewPost = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState();

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
      className="flex max-w-xl w-full z-40 mx-auto fixed bottom-0 items-end justify-between py-2 bg-slate-800/50 backdrop-blur-md"
    >
      <div className="w-full mr-3 flex">
        <textarea
          rows="1"
          onChange={(e) => setText(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50/20 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/25 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Whaazzzaz Upppp"
        ></textarea>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post
      </button>
    </form>
  );
};

export default NewPost;
