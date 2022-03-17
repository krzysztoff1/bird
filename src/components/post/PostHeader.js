import TimeAgo from "javascript-time-ago";
import { Link } from "react-router-dom";
import pl from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(pl);
const timeAgo = new TimeAgo("pl-PL");

const PostHeader = ({ account, time, uid, accountName }) => {
  console.log("====================================");
  console.log(accountName);
  console.log("====================================");
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full flex-wrap items-baseline">
        <Link to={`/profile/${uid}`}>
          <p className="mr-2 text-sm font-bold text-slate-900 dark:text-slate-200">
            {account} @{accountName}
          </p>
        </Link>
        <p className="mr-2 text-xs text-slate-900 dark:text-slate-200">
          {/* @{account.toLowerCase().replace(/ /g, "")} */}
        </p>
        <p className="mr-2 text-xs text-slate-900 dark:text-slate-200">
          {time?.seconds
            ? timeAgo.format(new Date(time.seconds * 1000), "twitter")
            : ""}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
