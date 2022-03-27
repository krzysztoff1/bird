import CircularProgress from "../status/CircularProgress";
import { useState, useRef, useContext, useEffect } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/auth-context";
import { ToastPortal } from "../toast/ToastPortal";
import { UploadPostContext } from "../../context/upload-context";
import { motion } from "framer-motion";
import { unmountComponentAtNode } from "react-dom";

const SmallNewPost = ({ post, parentId, comment, onPost }) => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const { state, dispatch } = useContext(UploadPostContext);
  const [text, setText] = useState("");
  const [open, toggleOpen] = useState(post ? true : false);
  const [file, setFile] = useState();
  const textArea = useRef();
  const toastRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.length)
      return toastRef.current.addMessage({
        mode: "info",
        message: "Add text to the post",
      });
    await uploadPost({ text, parentId, dispatch, addToast, file });
    setText("");
    textArea.current.value = "";
    setFile();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addToast = () => {
    toastRef.current.addMessage({
      mode: "success",
      message: "Post successfully Added",
    });
  };

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
    },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <>
      <ToastPortal ref={toastRef} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        onClick={() => toggleOpen(true)}
        className="w-full md:p-4"
      >
        {comment && open && (
          <label className="ml-4 text-black/70 dark:text-white/70">
            {t("in_response_to")}{" "}
            <span className="text-green-400">
              @{post?.account.toLowerCase()}
            </span>
          </label>
        )}
        <div className="flex px-3 sm:p-0">
          <img
            src={authState.userData?.profilePicture}
            className="my-3 mr-3 h-10 w-10 flex-shrink-0 rounded-full object-cover"
            alt="User avatar"
          />
          <div className={`w-full ${!open && "flex"}`}>
            <textarea
              ref={textArea}
              onChange={(e) => setText(e.target.value)}
              maxLength="280"
              className={`${
                !open && "truncate"
              } my-1 block min-h-[70px] w-full resize-none bg-transparent py-2.5 text-xl text-black outline-none transition-all  dark:text-white`}
              placeholder={comment ? t("send_post_in_response") : t("tweet")}
            />
            {file && (
              <section className="my-2 px-2">
                <div className="relative">
                  <svg
                    onClick={() => setFile("")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute m-1 h-5 w-5 rounded-full p-[3px] text-black dark:text-white"
                    viewBox="0 0 20 20"
                    fill="black"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <img
                    className="h-28 w-28 rounded-md"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                  />
                </div>
              </section>
            )}
            <div className="flex items-start justify-between">
              {open ? (
                <motion.div
                  variants={variants}
                  initial={open ? "open" : "collapsed"}
                  animate={open ? "open" : "collapsed"}
                  inherit={false}
                  className="flex w-full items-center justify-between"
                >
                  <button onClick={() => fileRef.current.click()} type="button">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="#22c55e"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <input
                    ref={fileRef}
                    onChange={handleFileChange}
                    multiple={false}
                    type="file"
                    hidden
                  />
                  <div className="flex items-center gap-3">
                    <CircularProgress
                      size={17}
                      strokeWidth={3}
                      percentage={(text.length / 280) * 100}
                      color="#4ade80"
                    />
                    {state.status === "idle" || state.status === "success" ? (
                      <button
                        type="submit"
                        className="w-24 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:w-44"
                      >
                        {t("post")}
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="w-24 items-center justify-center rounded-full bg-slate-800 px-5 py-2.5 text-center text-sm font-medium text-white md:flex md:w-44 "
                      >
                        <svg
                          role="status"
                          className="mr-0 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600 md:mr-2"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                        <p className="hidden md:block">Uploading...</p>
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={variants}
                  initial={!open ? "open" : "collapsed"}
                  animate={!open ? "open" : "collapsed"}
                  inherit={false}
                >
                  <button
                    type="submit"
                    className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("post")}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SmallNewPost;
