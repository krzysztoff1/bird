import PostAside from "./PostAside";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { getCurrentUser, getUserByUid } from "../../services/firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostSkeleton from "./PostSkeleton";
import PostLink from "../post/PostLink";
import PostHashtags from "./PostHashtags";

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
  linkData,
  inlineComment,
  hashtags,
}) => {
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    getUserByUid(uid)
      .then((userData) => {
        setProfilePicture(
          userData.profilePicture
            ? userData.profilePicture
            : userData.googleProfilePicture
        );
      })
      .catch((error) => console.log(error));
  }, []);

  if (!profilePicture) return <></>;

  return (
    <article
      className={`${
        inlineComment && "p-3"
      } z-0 mx-auto flex w-full max-w-full flex-grow  border-t-[1px] border-slate-200 p-3 transition hover:bg-neutral-100/30 dark:border-slate-800 dark:hover:bg-slate-800/30 md:p-4`}
    >
      {inlineComment && (
        <svg
          className="mr-2 h-6 w-6 rotate-90 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      )}
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
        {linkData && <PostLink linkData={linkData} />}
        {imageUrl && thumbnailUrl && (
          <PostImage
            averageColor={averageColor}
            id={id}
            imageUrl={imageUrl}
            thumbnailUrl={thumbnailUrl}
          />
        )}
        {hashtags && <PostHashtags hashtags={hashtags} />}
        <PostFooter
          commentedByUsers={commentedByUsers}
          likedByUsers={likedByUsers}
          id={id}
          parent={parent}
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
