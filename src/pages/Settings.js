import { useState, useEffect, useRef, useContext } from "react";
import { getCurrentUser, setUserDescription } from "../services/firebase";
import { db } from "../lib/firebase";
import Post from "../components/post/Post";
import Modal from "../components/modals/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../components/post/PostSkeleton";
import SetProfilePicture from "../components/forms/SetProfilePicture";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/auth-context";

const Settings = () => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const { toggleRefresher } = useContext(AuthContext);
  const [text, setText] = useState();
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [modal, toggleModal] = useState(false);
  const [profilePictureModal, toggleProfilePictureModal] = useState(false);
  const fileRef = useRef;

  const userData = authState.userData;

  useEffect(() => {
    if (!userData) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "==", userData.uid),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [numberOfPosts, userData]);

  if (!userData)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    );

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
          {console.log(text)}
          <textarea
            onChange={(e) => setText(e.target.value)}
            id="message"
            rows="4"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Profile description..."
          />
          <button
            disabled={text?.length !== 0 ? false : true}
            type="submit"
            className={`text-md mt-4 mb-3 w-full rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium transition hover:bg-slate-200`}
          >
            Set description
          </button>
        </form>
      </Modal>
      <Modal
        modal={profilePictureModal}
        toggleModal={toggleProfilePictureModal}
        title="Change profile Picture"
        subTitle="description of Change profile Picture"
      >
        <button
          type="button"
          onClick={() => {
            toggleProfilePictureModal(false);
            toggleRefresher((state) => !state);
          }}
        >
          Close
        </button>
        <SetProfilePicture toggle={toggleProfilePictureModal} />
      </Modal>
      <section className="min-h-screen bg-slate-900">
        <div className="flex">
          <img
            src="https://images.unsplash.com/photo-1646167858622-b94eb44d1b7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="user's background"
            className="h-28 w-full object-cover"
          />
        </div>
        <div className="mx-auto max-w-md -translate-y-8 px-4">
          <div className="flex items-end justify-between">
            <img
              onClick={() => toggleProfilePictureModal(true)}
              src={
                userData.profilePicture
                  ? userData.profilePicture
                  : userData.googleProfilePicture
              }
              width="60"
              height="60"
              alt="User avatar"
              className="h-20 w-20 rounded-full border-2 border-transparent object-cover"
            />
            <button
              type="button"
              className="h-min rounded-full border-[1px] border-slate-50/30 p-2 px-4 text-slate-50"
            >
              Fill profile
            </button>
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
          <button
            onClick={() => document.documentElement.classList.add("dark")}
            className="text-slate"
          >
            Dark Mode
          </button>
          <p className="text-slate-900 dark:text-slate-500">
            {userData.followedBy?.length && (
              <>
                <b className="font-bold text-slate-200">
                  {userData.followedBy.length}{" "}
                </b>{" "}
                {t("followers")} •{" "}
              </>
            )}
            {userData.following?.length && (
              <>
                <b className="font-bold text-slate-200">
                  {userData.following.length}{" "}
                </b>{" "}
                {t("following")}
              </>
            )}
          </p>
        </div>
        <hr className="mt-2 border-t-[0.5px] border-slate-600" />
        <p className="px-4 text-green-500">{t("posts")}</p>
        <InfiniteScroll
          dataLength={numberOfPosts}
          next={() => setNumberOfPosts(numberOfPosts + 5)}
          hasMore={true}
          loader={Array(3)
            .fill()
            .map((item, i) => (
              <PostSkeleton key={i} />
            ))}
          endMessage={
            <p className="text-center font-bold text-slate-100">
              Yay! You have seen it all
            </p>
          }
        >
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              uid={post.uid}
              account={post.account}
              time={post.timestamp}
              text={post.text}
              likedByUsers={post.likedByUsers}
              imageUrl={post.imageUrl}
              thumbnailUrl={post.thumbnailUrl}
            />
          ))}
        </InfiniteScroll>
      </section>
    </>
  );
};

export default Settings;
