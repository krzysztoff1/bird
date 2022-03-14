import SmallNewPost from "../forms/NewPost";
import { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import {
  getCurrentUser,
  uploadPost,
  uploadPostWithImage,
} from "../../services/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
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
      {!open && (
        <Link to="/compose/post">
          <div
            onClick={() => toggleOpen((state) => !state)}
            className="fixed bottom-20 right-8 z-[100] overflow-hidden rounded-full bg-teal-400"
          >
            <svg
              className={`h-12 w-12 transition-all ${open && "rotate-45"}`}
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
              />
            </svg>
          </div>
        </Link>
      )}
    </>
  );
};

export default FloatingButton;
