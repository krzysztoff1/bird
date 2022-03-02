import { useState, useRef } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";
import { useTranslation } from "react-i18next";

const NewComment = ({ post, profileImage, parentId }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [open, toggleOpen] = useState(false);
  const [file, setFile] = useState();
  const textArea = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    textArea.current.val("");
    setText("");
    if (!parentId) return;
    if (!file) return uploadPost({ text, parentId });
    uploadPostWithImage({ text, file, parentId });
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={() => toggleOpen(true)}
      className="mx-auto max-w-md md:max-w-xl"
    >
      {open ? (
        <label className=" ml-16 text-slate-500">
          {t("in_response_to")}
          <span className="text-teal-500"> @{post?.account.toLowerCase()}</span>
        </label>
      ) : null}
      <div className="flex sm:p-0 pr-3">
        <img
          className="w-10 h-10 m-3 rounded-full"
          src={profileImage}
          alt=" "
        />
        <div className={`w-full ${open ? "" : "flex"}`}>
          <textarea
            ref={textArea}
            onChange={(e) => setText(e.target.value)}
            id="message"
            rows={2}
            className={`${
              open ? "" : "truncate"
            } outline-none resize-none min-h-[70px] transition-all my-1 text-xl bg-transparent block py-2.5 w-full text-slate-100  bg-gray-50`}
            placeholder={t("send_post_in_response")}
          />
          <div className="flex shadow-xl justify-between items-start">
            {open ? (
              <>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 text-teal-500 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t("post")}
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-3 shadow-2xl overflow-visible rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t("post")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2 border-t-[0.5px] border-slate-600" />
    </form>
  );
};

export default NewComment;
