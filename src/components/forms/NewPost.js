import { useState } from "react";
import { getPosts, uploadPost } from "../../services/firebase";

const NewPost = () => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    uploadPost({ text });
    setText("");
    getPosts();
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="mx-auto flex max-w-md items-end justify-between py-2"
    >
      <div className="w-f2ull mr-3">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input w-full"
        ></input>
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
