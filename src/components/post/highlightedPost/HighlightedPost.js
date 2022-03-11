import { Link } from "react-router-dom";
import { db } from "../../../lib/firebase";
import {
  likePost,
  getCurrentUser,
  getUserByUid,
} from "../../../services/firebase";
import Spinner from "../../loaders/Spinner";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { monthsShort } from "../../../constans/date";
import PostImage from "../PostImage/PostImage";

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
          mx-auto w-full max-w-full flex-grow bg-slate-900 p-3 px-3 dark:border-slate-800 sm:max-w-md sm:p-3 sm:px-8 sm:hover:shadow-xl md:max-w-xl`}
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
        <PostImage id={id} imageUrl={imageUrl} thumbnailUrl={thumbnailUrl} />
      ) : null}
      <p className="mr-2 mt-4 text-slate-900 dark:text-slate-500">
        {monthsShort[new Date().getMonth(time?.seconds * 1000)]}
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
      <div className="z-10 mt-4 flex w-full justify-between">
        <div className="flex w-[55px] items-center">
          <div className="w-[40px]">
            <div
              onClick={() => likePost({ id })}
              className="flex cursor-pointer items-center justify-center shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="18"
                height="18"
              >
                {user && !likedByUsers.includes(user.uid) ? (
                  <path
                    fill={"white"}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.25 2.5C2.91421 2.5 1.5 3.66421 1.5 5.5C1.5 7.64969 3.08041 9.64375 4.8647 11.1819C5.73533 11.9325 6.60962 12.5358 7.26796 12.952C7.56407 13.1392 7.81492 13.2875 8 13.3934C8.18508 13.2875 8.43593 13.1392 8.73204 12.952C9.39039 12.5358 10.2647 11.9325 11.1353 11.1819C12.9196 9.64375 14.5 7.64969 14.5 5.5C14.5 3.66421 13.0858 2.5 11.75 2.5C10.3768 2.5 9.14121 3.48581 8.72114 4.95604C8.62915 5.27802 8.33486 5.5 8 5.5C7.66514 5.5 7.37085 5.27802 7.27886 4.95604C6.85879 3.48581 5.62319 2.5 4.25 2.5ZM8 14.25C7.65543 14.9162 7.65523 14.9161 7.655 14.9159L7.65269 14.9147L7.64731 14.9119L7.62883 14.9022C7.61313 14.8939 7.59074 14.882 7.5621 14.8665C7.50484 14.8356 7.42254 14.7904 7.3188 14.7317C7.1114 14.6142 6.81771 14.442 6.46642 14.2199C5.76538 13.7767 4.82717 13.13 3.8853 12.3181C2.04459 10.7312 0 8.35031 0 5.5C0 2.83579 2.08579 1 4.25 1C5.79736 1 7.15289 1.80151 8 3.01995C8.84711 1.80151 10.2026 1 11.75 1C13.9142 1 16 2.83579 16 5.5C16 8.35031 13.9554 10.7312 12.1147 12.3181C11.1728 13.13 10.2346 13.7767 9.53358 14.2199C9.18229 14.442 8.8886 14.6142 8.6812 14.7317C8.57746 14.7904 8.49517 14.8356 8.4379 14.8665C8.40926 14.882 8.38687 14.8939 8.37117 14.9022L8.35269 14.9119L8.34731 14.9147L8.34501 14.9159C8.34477 14.9161 8.34457 14.9162 8 14.25ZM8 14.25L8.34501 14.9159C8.12889 15.0277 7.87111 15.0277 7.655 14.9159L8 14.25Z"
                  />
                ) : (
                  <path
                    fill={"#e11d48"}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.655 14.9159C7.65523 14.9161 7.65543 14.9162 8 14.25C8.34457 14.9162 8.34477 14.9161 8.34501 14.9159C8.12889 15.0277 7.87111 15.0277 7.655 14.9159ZM7.655 14.9159L8 14.25L8.34501 14.9159L8.34731 14.9147L8.35269 14.9119L8.37117 14.9022C8.38687 14.8939 8.40926 14.882 8.4379 14.8665C8.49516 14.8356 8.57746 14.7904 8.6812 14.7317C8.8886 14.6142 9.18229 14.442 9.53358 14.2199C10.2346 13.7767 11.1728 13.13 12.1147 12.3181C13.9554 10.7312 16 8.35031 16 5.5C16 2.83579 13.9142 1 11.75 1C10.2026 1 8.84711 1.80151 8 3.01995C7.15289 1.80151 5.79736 1 4.25 1C2.08579 1 0 2.83579 0 5.5C0 8.35031 2.04459 10.7312 3.8853 12.3181C4.82717 13.13 5.76538 13.7767 6.46642 14.2199C6.81771 14.442 7.1114 14.6142 7.3188 14.7317C7.42254 14.7904 7.50484 14.8356 7.5621 14.8665C7.59074 14.882 7.61313 14.8939 7.62883 14.9022L7.64731 14.9119L7.65269 14.9147L7.655 14.9159Z"
                  />
                )}
              </svg>
            </div>
          </div>
          <p className="h-fit text-xs text-slate-800 dark:text-white">
            <span>{likedByUsers.length}</span>
          </p>
        </div>
        <div className="flex w-[55px] items-center">
          <div className="w-[40px]">
            <span className="h-[34px] w-[34px] flex-shrink-0 rounded-full p-[8px] text-slate-800 transition dark:text-white sm:hover:bg-green-200  sm:hover:text-green-400 dark:sm:hover:text-green-400">
              <i className="fas fa-retweet"></i>
            </span>
          </div>
          <p className="h-fit text-xs text-slate-800 dark:text-white">0</p>
        </div>
        <div className="flex w-[55px] items-center">
          <div className="w-[40px]">
            {parent ? (
              <span className="h-[34px] w-[34px] flex-shrink-0 rounded-full p-[8px] text-slate-800 transition dark:text-white sm:hover:bg-blue-200  sm:hover:text-blue-400 dark:sm:hover:text-blue-400">
                <i className="far fa-comment"></i>
              </span>
            ) : (
              <Link to={`/post/${id}`}>
                <span className="h-[34px] w-[34px] flex-shrink-0 rounded-full p-[8px] text-slate-800 transition dark:text-white sm:hover:bg-blue-200  sm:hover:text-blue-400 dark:sm:hover:text-blue-400">
                  <i className="far fa-comment"></i>
                </span>
              </Link>
            )}
          </div>
          <p className="h-fit text-xs text-slate-800 dark:text-white">
            {numberOfComments ? numberOfComments : "0"}
          </p>
        </div>
      </div>
      <hr className="mt-4 border-t-[0.5px] border-slate-600" />
    </article>
  );
};

Post.defaultProps = {
  account: "Account",
  text: "Text",
  time: "Just now",
};

export default Post;
