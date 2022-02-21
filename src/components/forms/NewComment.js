import { useState } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";

const NewComment = (id) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return uploadPost({ text, id });
    uploadPostWithImage({ text, file, id });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="mx-auto flex max-w-md items-end fixed bottom-0 justify-between py-2"
    >
      <div className="w-full mr-3">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="textarea w-full"
          placeholder="Whaazzzaz Upppp"
        />
        <input onChange={(e) => setFile(e.target.files[0])} type="file" />
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

export default NewComment;
