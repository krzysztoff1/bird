import PostAside from "./PostAside";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { getCurrentUser, getUserByUid } from "../../services/firebase";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostSkeleton from "./PostSkeleton";

const Post = ({
  accountName,
  averageColor,
  account,
  text,
  likedByUsers,
  time,
  id,
  uid,
  thumbnailUrl,
  commentedByUsers,
  imageUrl,
  parent,
  inlineComment,
}) => {
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
    getUserByUid(uid).then((userData) => {
      setProfilePicture(
        userData.profilePicture
          ? userData.profilePicture
          : userData.googleProfilePicture
      );
    });
  }, []);

  if (!profilePicture) return <PostSkeleton />;

  return (
    <article
      className={`${
        inlineComment ? "border-t-0 p-3" : "mt-2"
      } inlineComment z-0 mx-auto flex
          w-full max-w-full flex-grow rounded-md bg-slate-900 p-3 px-6 sm:p-3`}
    >
      <PostAside
        inlineComment={inlineComment}
        uid={uid}
        profilePicture={profilePicture}
      />
      <div className="w-full">
        <PostHeader
          accountName={accountName}
          account={account}
          time={time}
          uid={uid}
        />
        <Link to={`/post/${id}`}>
          <PostContent text={text} />
        </Link>
        {imageUrl && thumbnailUrl && (
          <PostImage
            averageColor={averageColor}
            id={id}
            imageUrl={imageUrl}
            thumbnailUrl={thumbnailUrl}
          />
        )}
        <PostFooter
          commentedByUsers={commentedByUsers}
          likedByUsers={likedByUsers}
          user={user}
          id={id}
          parent={parent}
          numberOfComments={"2"}
        />
      </div>
    </article>
  );
};

Post.defaultProps = {
  account: "Account",
  text: "Text",
  time: "Just now",
};

export default Post;
