import { useState } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";

const NewComment = (parentId) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return uploadPost({ text, parentId });
    uploadPostWithImage({ text, file, parentId });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="fixed bottom-4 mx-auto flex max-w-md items-end justify-between py-2 pb-28"
    >
      <div className="mr-3 w-full">
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
