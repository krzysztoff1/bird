import { useState, useRef, useContext } from "react";
import { uploadPost, uploadPostWithImage } from "../../services/firebase";
import { useTranslation } from "react-i18next";
import CircularProgress from "../uiElements/CircularProgress";
import { AuthContext } from "../../context/auth-context";
import { ToastPortal } from "../toast/ToastPortal";

const SmallNewPost = ({ post, parentId, comment }) => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const [text, setText] = useState("");
  const [open, toggleOpen] = useState(post ? true : false);
  const [file, setFile] = useState();
  const textArea = useRef();
  const toastRef = useRef();

  const addToast = () => {
    toastRef.current.addMessage({
      mode: "success",
      message: "Post successfully Added",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.length)
      return toastRef.current.addMessage({
        mode: "info",
        message: "Add text to the post",
      });
    if (!file) {
      let uploadState = await uploadPost({ text, parentId });
      console.log(uploadState);
      if (uploadState) return addToast();
      return console.log("test");
    }
    let isUploaded = await uploadPostWithImage({ text, file, parentId });
    if (isUploaded) return addToast();
  };

  return (
    <>
      <ToastPortal ref={toastRef} />
      <form
        onSubmit={(e) => handleSubmit(e)}
        onClick={() => toggleOpen(true)}
        className="w-full sm:p-3"
      >
        {open && comment && (
          <label className=" ml-16 text-white/50">
            {t("in_response_to")}
            <span className="text-green-400">
              @{post?.account.toLowerCase()}
            </span>
          </label>
        )}
        <div className="flex pr-3 sm:p-0">
          <img
            src={authState.userData?.profilePicture}
            className="m-3 h-10 w-10 rounded-full"
            alt=" "
          />
          <div className={`w-full ${!open && "flex"}`}>
            <textarea
              ref={textArea}
              onChange={(e) => setText(e.target.value)}
              id="message"
              rows={2}
              className={`${
                !open && "truncate"
              } my-1 block min-h-[70px] w-full resize-none bg-transparent py-2.5 text-xl text-slate-100 outline-none  transition-all`}
              placeholder={comment ? t("send_post_in_response") : t("tweet")}
            />
            <div className="flex items-start justify-between shadow-xl">
              {open ? (
                <>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
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
                  <div className="flex items-center gap-3">
                    <CircularProgress
                      size={17}
                      strokeWidth={3}
                      percentage={(text.length / 280) * 100}
                      color="#4ade80"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {t("post")}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="mt-3 overflow-visible rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-2xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </>
  );
};

export default SmallNewPost;
