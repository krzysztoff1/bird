import { markReadNotification } from "../../services/firebase";
import { useTranslation } from "react-i18next";
import TimeAgo from "javascript-time-ago";
import { Link } from "react-router-dom";
const timeAgo = new TimeAgo("pl-PL");

const Notification = ({ docId, name, timestamp, id }) => {
  const { t } = useTranslation();

  return (
    <article className="my-1 mx-2 rounded-md bg-slate-800 px-3 py-4">
      <div className="flex justify-between">
        <p className="inline-flex text-slate-300">
          {timestamp?.seconds
            ? timeAgo.format(new Date(timestamp.seconds * 1000), "twitter")
            : ""}
        </p>
        <svg
          onClick={() => markReadNotification(docId)}
          className="inline-flex h-6 w-6 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex text-slate-100">
        <Link to={`/post/${id}`}>
          <b>{name}</b>{" "}
          <span className="font-light text-slate-300">
            {t("liked_your_post.")}
          </span>{" "}
        </Link>
      </div>
    </article>
  );
};

export default Notification;
