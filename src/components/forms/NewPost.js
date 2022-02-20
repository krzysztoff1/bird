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
      className="mx-auto flex max-w-md items-end justify-between py-2"
    >
      <div className="w-full mr-3">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="textarea w-full"
          placeholder="Whaazzzaz Upppp"
        />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name=""
          id=""
        />
      </div>
      <button
        type="submit"
        className={`btn ${!text ? "btn-disabled" : ""} btn-active btn-primary`}
      >
        Post
      </button>
    </form>
  );
};

export default NewPost;
