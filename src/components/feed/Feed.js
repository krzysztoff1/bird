import NewPost from "../forms/NewPost";
import { useEffect, useState } from "react";
import PostsList from "./PostsList";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

const Feed = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  return (
    <div>
      <NewPost />
      <div className="my-3 flex w-full justify-center bg-slate-700 py-4">
        <div className="avatar-group mx-auto flex -space-x-4">
          {!users ? (
            <Skeleton />
          ) : (
            users.map((user) => (
              <Link key={user.uid} to={`/profile/${user.uid}`}>
                <div className={`w-12 rounded-full overflow-hidden  shadow-md`}>
                  <img alt="" src={user.googleProfilePicture} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <PostsList />
    </div>
  );
};

export default Feed;
