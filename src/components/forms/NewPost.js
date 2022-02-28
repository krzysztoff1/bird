import { useState, useEffect, useRef, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import Modal from "../modals/Modal";
import {
  saveWorkingCopy,
  getCurrentUser,
  uploadPost,
  uploadPostWithImage,
} from "../../services/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const NewPost = () => {
  const { t } = useTranslation();

  const [open, toggleOpen] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [draftsModal, toggleDraftsModal] = useState(false);
  const [user, setUser] = useState();
  const [text, setText] = useState("");
  const [drafts, setDrafts] = useState();
  const [file, setFile] = useState();
  const textField = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      query(collection(db, "drafts"), where("uid", "==", user.uid)),
      (snapshot) => {
        if (snapshot.size === 0) return setDrafts(false);
        setDrafts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      uploadPost({ text });
      navigate("/");
      return;
    }
    uploadPostWithImage({ text, file });
    navigate("/");
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <Modal
        modal={modal}
        toggleModal={toggleModal}
        title="Save draft?"
        subTitle="Możesz zapisać tego Tweeta jako szkic i wysłać go później."
      >
        <button
          onClick={() => {
            saveWorkingCopy(text);
            navigate("/");
          }}
          type="button"
          className="text-md mb-3 w-full rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium transition hover:bg-slate-200"
        >
          Save draft
        </button>
        <button
          onClick={() => {
            toggleModal(false);
            navigate("/");
          }}
          type="button"
          className="text-md w-full  rounded-full border-[1px] border-slate-50/30 py-2 font-medium text-slate-50"
        >
          Discard
        </button>
      </Modal>
      <Modal
        modal={draftsModal}
        toggleModal={toggleDraftsModal}
        title="Saved drafts"
      >
        <ul className="max-h-[60vh] overflow-scroll">
          {drafts
            ? drafts.map((draft, i) => (
                <p
                  key={draft.id}
                  onClick={() => {
                    textField.current.value = drafts[i].text;
                    setText(drafts[i].text);
                    toggleDraftsModal(false);
                  }}
                  className="my-2 text-slate-100"
                >
                  {draft.text}
                </p>
              ))
            : null}
        </ul>
      </Modal>
      <section className="z-50 h-screen w-screen overflow-hidden bg-slate-900 pb-[60px]">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            toggleOpen((state) => !state);
          }}
          className="z-50 mx-auto flex h-full w-full flex-col items-start justify-between "
        >
          <div className="mt-6 w-full px-3">
            <div className="flex w-full justify-between">
              <button
                type="button"
                onClick={() => (!text ? navigate("/") : toggleModal(true))}
                className="p-3 font-bold text-slate-100"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="flex">
                {drafts ? (
                  <button
                    type="button"
                    onClick={() => {
                      toggleDraftsModal((state) => !state);
                    }}
                    className="m-3 rounded-full  px-5 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Saved
                  </button>
                ) : null}
                <button
                  type="submit"
                  className="m-3 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t("post")}
                </button>
              </div>
            </div>
            <div className="mt-4 flex w-full px-3">
              <img
                className="h-8 w-8 flex-none rounded-full"
                src={user ? user.photoURL : null}
                alt=""
                srcSet=""
              />
              <textarea
                ref={textField}
                rows="8"
                onChange={(e) => setText(e.target.value)}
                className="text-md flex-grow-2 block w-full rounded-lg bg-transparent px-5 py-8 pt-0 text-slate-100 outline-none"
                placeholder="Whaazzzaz Upppp"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="m-1 flex w-full border-b-2 border-slate-700 pb-1">
              <svg
                className="mr-2 h-6 w-6"
                fill="#4ade80"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-green-400">Everyone can respond</p>
            </div>
            <div className="flex w-full items-center justify-between p-1">
              <div className="flex items-center gap-3">
                <svg
                  className="h-6 w-6"
                  fill="#4ade80"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="h-6 w-6"
                  fill="#4ade80"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="h-6 w-6"
                  fill="#4ade80"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
                </svg>
                <svg
                  className="h-6 w-6"
                  fill="#4ade80"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress
                  className="max-w-12"
                  sx={{
                    width: 150,
                    color: "#4ade80",
                  }}
                  variant="determinate"
                  value={Math.trunc((text.length / 280) * 100)}
                />
                <svg
                  className="h-6 w-6"
                  fill="#4ade80"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </form>
      </section>
    </Suspense>
  );
};

export default NewPost;

{
  /* <div className="mr-3 flex w-full">
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
</button> */
}
