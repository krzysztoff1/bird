import { Link } from "react-router-dom";
import Spinner from "../loaders/Spinner";

const PostAside = ({ uid, profilePicture, inlineComment }) => {
  return (
    <aside className={`mr-2 flex flex-shrink-0`}>
      {inlineComment && (
        <div className="mr-2 h-full w-[2px] bg-slate-500"></div>
      )}
      <Link to={`/profile/${uid}`}>
        {profilePicture ? (
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={profilePicture}
            alt="avatar"
          />
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </Link>
    </aside>
  );
};

export default PostAside;
