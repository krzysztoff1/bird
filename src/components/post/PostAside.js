import { Link } from "react-router-dom";
import Spinner from "../loaders/Spinner";

const PostAside = ({ uid, profilePicture, inlineComment }) => {
  return (
    <aside
      className={`
       
     flex-shrink-0 w-10 h-10 mr-2 `}
    >
      <Link to={`/profile/${uid}`}>
        {profilePicture ? (
          <img
            className="w-10 h-10 object-cover rounded-full"
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
