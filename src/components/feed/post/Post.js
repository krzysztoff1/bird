import { useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  likePost,
  getUserByUid,
} from "../../../services/firebase";
import LazyLoad from "react-lazyload";
import { HeartIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import ProgressiveImage from "react-progressive-graceful-image";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const Post = ({
  account,
  text,
  likedByUsers,
  time,
  id,
  uid,
  thumbnailUrl,
  imageUrl,
  parent,
}) => {
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
    getUserByUid(uid).then((res) =>
      setProfilePicture(res.googleProfilePicture)
    );
  }, []);

  return (
    <div className="my-2 mx-auto flex max-w-md rounded-lg bg-white shadow-lg dark:bg-slate-800">
      <div className="flex items-start px-4 py-6 w-full">
        <Link to={`/profile/${uid}`}>
          <aside className="avatar">
            <div className="mr-4 w-12 rounded-full">
              <img alt="" src={profilePicture} />
            </div>
          </aside>
        </Link>
        <div className="w-full">
          <div className="flex items-start justify-between">
            <h2 className="-mt-1 mr-3 text-lg font-semibold text-gray-900 dark:text-slate-100">
              {account}
            </h2>
            <p className="text-sm text-gray-700 dark:text-slate-300">
              {time?.seconds
                ? timeAgo.format(new Date(time.seconds * 1000))
                : Date.now().toString()}
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-slate-200">
            {text}
          </p>
          {imageUrl && thumbnailUrl ? (
            <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
              {(src) => <img className="w-full" src={src} alt="" />}
            </ProgressiveImage>
          ) : null}
          <div className="mt-4 h-fit px-2 flex items-center justify-between">
            <div
              onClick={() => likePost({ id })}
              className="mr-3 flex items-center text-sm text-gray-700 dark:text-slate-200"
            >
              {user && likedByUsers.includes(user.uid) ? (
                <HeartIcon className="mr-2 w-7 p-1 text-rose-600 rounded-full sm:hover:bg-rose-400/50 transition" />
              ) : (
                <HeartIcon className="mr-2 w-7 p-1 sm:hover:text-rose-500 rounded-full sm:hover:bg-rose-400/50 transition" />
              )}
              <span>{likedByUsers.length}</span>
            </div>
            {parent ? (
              <div className="flex items-center text-sm text-gray-700 dark:text-slate-200">
                <ChatAlt2Icon className="mr-2 w-7 p-1 rounded-full sm:hover:text-blue-600 sm:hover:bg-blue-300/50 transition" />
                <span>8</span>
              </div>
            ) : (
              <Link to={`/post/${id}`}>
                <div className="flex items-center text-sm text-gray-700 dark:text-slate-200">
                  <ChatAlt2Icon className="mr-2 w-7 p-1 rounded-full sm:hover:text-blue-600 sm:hover:bg-blue-300/50 transition" />
                  <span>8</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
