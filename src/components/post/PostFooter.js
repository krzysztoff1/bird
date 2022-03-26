import { likePost } from "../../services/firebase";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import ToolTip from "../toolTip/ToolTip";

const PostFooter = ({ likedByUsers, id, parent, commentedByUsers }) => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="mt-3 flex w-full justify-between">
      <div className="flex w-[55px] items-center">
        <div className="flex w-[30px]">
          <button
            onClick={() => likePost({ id })}
            className="flex cursor-pointer items-center justify-center"
          >
            {!likedByUsers.includes(currentUser.uid) ? (
              <svg
                className="h-6 w-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-rose-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="h-fit text-xs text-slate-800 dark:text-white">
          {likedByUsers.length}
        </p>
      </div>
      <div className="flex w-[55px] items-center">
        <div className="w-[30px]">
          <svg
            className="h-6 w-6 text-black dark:text-white "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
            />
          </svg>
        </div>
        <p className="h-fit text-xs text-slate-800 dark:text-white">0</p>
      </div>
      <div className="flex w-[55px] items-center">
        <div className="w-[30px]">
          {parent ? (
            <svg
              className="h-6 w-6 text-black dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
          ) : (
            <Link to={`/post/${id}`}>
              <svg
                className="h-6 w-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </Link>
          )}
        </div>
        <p className="h-fit text-xs text-slate-800 dark:text-white">
          {commentedByUsers ? commentedByUsers : "0"}
        </p>
      </div>
    </div>
  );
};

export default PostFooter;
