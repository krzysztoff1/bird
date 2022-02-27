import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { getCurrentUser, setUserDescription } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import Modal from "../components/modals/Modal";

const Settings = () => {
  const [text, setText] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [modal, toggleModal] = useState(false);

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (!user) return;
    async function getData() {
      const postRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(postRef);

      setUserData(docSnap.data());
    }
    getData();
  }, [user, modal]);

  if (!userData)
    return <div className="h-screen w-screen bg-slate-900">Loading</div>;

  return (
    <>
      <Modal
        md
        modal={modal}
        toggleModal={toggleModal}
        title="Profile description"
        subTitle=""
      >
        <form
          onSubmit={() => {
            setUserDescription(text);
            toggleModal(false);
          }}
        >
          <textarea
            onChange={(e) => setText(e.target.value)}
            id="message"
            rows="4"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Profile description..."
          />
          <button
            type="submit"
            className="text-md mt-4 mb-3 w-full rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium transition hover:bg-slate-200"
          >
            Set description
          </button>
        </form>
      </Modal>
      <section className="min-h-screen bg-slate-900">
        <div className="mx-auto max-w-md px-4 pt-24">
          <div className="flex justify-between">
            <img
              src={userData.googleProfilePicture}
              width="60"
              height="60"
              alt="User avatar"
              className="rounded-full"
            />
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-wider text-slate-200">
            {userData.name}
          </h3>
          <div
            onClick={() => toggleModal(true)}
            className="my-1 flex gap-3 text-slate-200"
          >
            <p>
              {userData.description
                ? userData.description
                : "Add description to your profile"}
            </p>
            <svg
              className="h-7 w-7 rounded-full p-1 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
