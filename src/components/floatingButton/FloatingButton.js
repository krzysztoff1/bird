import NewPost from "../forms/NewPost";
import { useState, useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { db } from "../../lib/firebase";
import {
  saveWorkingCopy,
  getCurrentUser,
  uploadPost,
  uploadPostWithImage,
} from "../../services/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import BottomModal from "../modals/BottomModal";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  const [open, toggleOpen] = useState(Boolean);
  const [modal, toggleModal] = useState(Boolean);
  const [draftsModal, toggleDraftsModal] = useState(Boolean);
  const [text, setText] = useState(String);
  const [user, setUser] = useState();
  const [drafts, setDrafts] = useState();
  const [file, setFile] = useState();
  const textField = useRef();

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
      return;
    }
    uploadPostWithImage({ text, file });
  }

  return (
    <>
      <AnimatePresence>
        {!open ? (
          <Link to="/compose/post">
            <motion.div
              exit={{ scale: 0.001, opacity: 0 }}
              initial={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => toggleOpen((state) => !state)}
              className="fixed bottom-20 right-8 z-50 overflow-hidden rounded-full bg-teal-400"
            >
              <svg
                className={`h-12 w-12 transition-all ${
                  open ? "rotate-45" : ""
                }`}
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </motion.div>
          </Link>
        ) : null}
      </AnimatePresence>
      {/* <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 2000 }}
            className="fixed bottom-0 z-50 h-[100vh] w-[100vw] "
          >
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                toggleOpen((state) => !state);
              }}
              className="z-50 mx-auto flex h-full w-full flex-col items-start justify-between bg-slate-900"
            >
              <div className="mt-6 w-full px-3">
                <div className="flex w-full justify-between">
                  <button
                    onClick={() =>
                      text
                        ? toggleModal((state) => !state)
                        : toggleOpen((state) => !state)
                    }
                    className="p-3 font-bold text-slate-100"
                  >
                    <svg
                      class="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
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
                        className="m-3 rounded-full  px-5 py-2.5 text-center text-sm font-medium text-white  focus:ring-4 focus:ring-blue-300 "
                      >
                        Saved
                      </button>
                    ) : null}
                    <button
                      type="submit"
                      className="m-3 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Post
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
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {modal ? (
          <BottomModal>
            <button
              onClick={() => {
                saveWorkingCopy(text);
                toggleModal(false);
                toggleOpen(false);
              }}
              className="p-2 text-xl text-teal-400  hover:underline"
            >
              Save draft
            </button>
            <button
              onClick={() => {
                toggleModal((state) => !state);
                toggleOpen((state) => !state);
              }}
              className="p-2 text-xl text-rose-500 hover:underline"
            >
              Discard
            </button>
            <button
              onClick={() => toggleModal((state) => !state)}
              className="mt-4 rounded-full border p-2 px-4 py-2 text-xl text-slate-100"
            >
              Cancel
            </button>
          </BottomModal>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {draftsModal ? (
          <BottomModal>
            <div className="flex w-full justify-between">
              <button
                onClick={() => toggleDraftsModal(false)}
                className="text-slate-100"
              >
                Close
              </button>
              <button className="text-slate-100">Edit</button>
            </div>
            {drafts.map((draft, i) => (
              <ul
                key={draft.id}
                className="flex w-full max-w-[80vw] rounded-md sm:hover:bg-slate-700"
              >
                <li
                  onClick={() => {
                    textField.current.value = drafts[i].text;
                    setText(drafts[i].text);
                    toggleDraftsModal(false);
                  }}
                  className="flex w-full cursor-pointer border-b-2 border-slate-700 py-2 text-zinc-100"
                >
                  <input
                    class="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                    type="radio"
                  />
                  <p>{draft.text}</p>
                </li>
              </ul>
            ))}
          </BottomModal>
        ) : null}
      </AnimatePresence> */}
    </>
  );
};

export default FloatingButton;
