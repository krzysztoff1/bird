import { useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  likePost,
  getUserByUid,
} from "../../../services/firebase";
import { HeartIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Post = ({ account, text, likedByUsers, time, id, uid }) => {
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
      <div className="flex items-start px-4 py-6">
        <Link to={`/profile/${uid}`}>
          <aside className="avatar">
            <div className="mr-4 w-12 rounded-full">
              <img alt="" src={profilePicture} />
            </div>
          </aside>
        </Link>
        <div className="">
          <div className="flex items-start justify-between">
            <h2 className="-mt-1 mr-3 text-lg font-semibold text-gray-900 dark:text-slate-100">
              {account}
            </h2>
            <p className="text-sm text-gray-700 dark:text-slate-300">
              {time?.seconds
                ? new Date(time.seconds * 1000).toString()
                : Date.now()}
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-slate-200">
            {text}
          </p>
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
            <div className="flex items-center text-sm text-gray-700 dark:text-slate-200">
              <ChatAlt2Icon className="mr-2 w-7 p-1 rounded-full sm:hover:text-blue-600 sm:hover:bg-blue-300/50 transition" />
              <span>8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
