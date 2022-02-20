import NewPost from "../forms/NewPost";
import { useEffect, useState } from "react";
import PostsList from "./PostsList";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/firebase";

const Feed = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  if (!users) return <p>Loading</p>;

  return (
    <div>
      <NewPost />
      <div className="my-3 flex w-full justify-center">
        <div className="avatar-group mx-auto -space-x-4">
          {users.map((user) => (
            <Link key={user.uid} to={`/profile/${user.uid}`}>
              <div className="avatar">
                <div className="w-12">
                  <img alt="" src={user.googleProfilePicture} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PostsList />
    </div>
  );
};

export default Feed;
