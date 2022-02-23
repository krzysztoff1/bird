import TimeAgo from "javascript-time-ago";
import { Link } from "react-router-dom";

import pl from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(pl);
const timeAgo = new TimeAgo("pl-PL");

const PostHeader = ({ account, time, uid }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-baseline w-full">
        <Link to={`/profile/${uid}`}>
          <p className="text-slate-900 font-bold dark:text-slate-200 mr-2 text-sm">
            {account}
          </p>
        </Link>
        <p className="text-slate-900 dark:text-slate-200 mr-2 text-xs">
          @{account.toLowerCase().replace(/ /g, "")}
        </p>
        <p className="text-slate-900 dark:text-slate-200 mr-2 text-xs">
          {time?.seconds
            ? timeAgo.format(new Date(time.seconds * 1000))
            : Date.now().toString()}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
