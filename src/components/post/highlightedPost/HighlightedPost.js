import { db } from "../../../lib/firebase";
import PostImage from "../PostImage";
import {
  likePost,
  getCurrentUser,
  getUserByUid,
} from "../../../services/firebase";
import Spinner from "../../loaders/Spinner";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { monthsShort } from "../../../constans/date";
import PostFooter from "../PostFooter";

const Post = ({
  account,
  text,
  likedByUsers,
  time,
  id,
  uid,
  thumbnailUrl,
  imageUrl,
  averageColor,
  parent,
  inlineComment,
}) => {
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState("");
  const [numberOfComments, setNumberOfComments] = useState("");

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
    getUserByUid(uid).then((res) =>
      setProfilePicture(
        res.profilePicture ? res.profilePicture : res.googleProfilePicture
      )
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", true),
        where("parentId", "==", id)
      ),
      (snapshot) => {
        setNumberOfComments(snapshot.size);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <article
      className={`${
        inlineComment ? "border-r-2 border-t-0 pl-8" : "mt-2 "
      } inlineComment shadow-slate-500" z-0
          mx-auto w-full max-w-full flex-grow bg-slate-900 p-3 px-3 dark:border-slate-800 sm:max-w-md sm:p-3 sm:px-8 md:max-w-xl`}
    >
      <div className="flex">
        {profilePicture ? (
          <Link to={`/profile/${uid}`}>
            <img
              className="h-14 w-14 rounded-full object-cover"
              src={profilePicture}
              alt="avatar"
            />
          </Link>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
        <div className="ml-2.5 flex flex-col items-start justify-center">
          <Link to={`/profile/${uid}`}>
            <p className="text-md mr-2 font-medium tracking-wider text-slate-900 dark:text-slate-200">
              {account}
            </p>
          </Link>
        </div>
      </div>
      <p className="text-md mt-4 mb-1 text-xl text-white dark:text-slate-200">
        {text}
      </p>
      {imageUrl && thumbnailUrl ? (
        <PostImage
          id={id}
          averageColor={averageColor}
          imageUrl={imageUrl}
          thumbnailUrl={thumbnailUrl}
        />
      ) : null}
      <p className="mr-2 mt-4 text-slate-900 dark:text-slate-500">
        {new Date(time?.seconds * 1000).getHours()}:
        {new Date(time?.seconds * 1000).getMinutes()} &bull;{" "}
        {monthsShort[new Date().getMonth(time?.seconds * 1000)]}{" "}
        {new Date(time?.seconds * 1000).getDate()}{" "}
        {new Date(time?.seconds * 1000).getFullYear()}
      </p>
      {likedByUsers.length || numberOfComments ? (
        <hr className="mt-3 border-t-[0.5px] border-slate-600" />
      ) : null}
      <div
        className={`${
          likedByUsers.length || numberOfComments ? "my-3 flex gap-3" : null
        }`}
      >
        {likedByUsers.length ? (
          <p className="text-slate-900 dark:text-slate-500">
            <b className="font-bold text-slate-200">{likedByUsers.length}</b>{" "}
            {t("likes")}
          </p>
        ) : null}
        {numberOfComments ? (
          <p className="text-slate-900 dark:text-slate-500">
            <b className="font-bold text-slate-200">{numberOfComments}</b>{" "}
            {t("comments")}
          </p>
        ) : null}
      </div>
      <hr className="mt-2 border-t-[0.5px] border-slate-600" />
      <PostFooter
        commentedByUsers={numberOfComments}
        likedByUsers={likedByUsers}
        id={id}
        parent={parent}
      />
    </article>
  );
};

Post.defaultProps = {
  account: "Account",
  text: "Text",
  time: "Just now",
};

export default Post;
