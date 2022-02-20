import NewPost from "../forms/NewPost";
import PostsList from "./PostsList";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <div>
      <NewPost />
      <div className="my-3 flex w-full justify-center">
        <div className="avatar-group mx-auto -space-x-4">
          <div className="avatar">
            <Link to={`/profile/${"re1wUtztEKSHpgnRtybR2bj61wk2"}`}>
              <div className="w-12">
                <img
                  alt=""
                  src="https://api.lorem.space/image/face?hash=53273"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <PostsList />
    </div>
  );
};

export default Feed;
