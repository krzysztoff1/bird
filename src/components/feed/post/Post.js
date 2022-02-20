import { useState, useEffect, useContext } from "react";
import {
  getCurrentUser,
  likePost,
  getUserByUid,
} from "../../../services/firebase";
import { HeartIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Post = ({ account, text, likedByUsers, time, id, uid }) => {
  const [date, setDate] = useState("");
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState("");

  getCurrentUser().then((res) => setUser(res));
  getUserByUid(uid).then((res) => setProfilePicture(res.googleProfilePicture));

  useEffect(() => {
    if (time === null) {
      setDate("just now");
    } else {
      setDate(new Date(time.seconds * 1000).toString());
    }
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
            <p className="text-sm text-gray-700 dark:text-slate-300">{date}</p>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-slate-200">
            {text}
          </p>
          <div className="mt-4 flex items-center ">
            <div
              onClick={() => likePost({ id })}
              className="mr-3 flex text-sm text-gray-700 dark:text-slate-200"
            >
              {user && likedByUsers.includes(user.uid) ? (
                <HeartIcon className="mr-1 w-5 text-rose-600" />
              ) : (
                <HeartIcon className="mr-1 w-5" />
              )}
              <span>{likedByUsers.length}</span>
            </div>
            <div className="mr-8 flex text-sm text-gray-700 dark:text-slate-200">
              <span>8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
