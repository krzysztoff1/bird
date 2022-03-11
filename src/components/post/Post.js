import PostAside from "./PostAside";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage/PostImage";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { getCurrentUser, getUserByUid } from "../../services/firebase";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Post = ({
  averageColor,
  account,
  text,
  likedByUsers,
  time,
  id,
  uid,
  thumbnailUrl,
  imageUrl,
  parent,
  inlineComment,
}) => {
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState("");
  const [numberOfComments, setNumberOfComments] = useState("");

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", true),
        where("parentId", "==", id)
      ),
      (snapshot) => {
        setNumberOfComments(snapshot.size);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <article
      className={`${
        inlineComment ? "border-t-0 p-3" : "mt-2"
      } inlineComment shadow-slate-500" z-0 mx-auto flex
          w-full max-w-full flex-grow rounded-md bg-slate-900 p-3 px-6 sm:max-w-md sm:p-3 sm:hover:shadow-xl md:max-w-xl`}
    >
      <PostAside
        inlineComment={inlineComment}
        uid={uid}
        profilePicture={profilePicture}
      />
      <div className="w-full">
        <PostHeader account={account} time={time} uid={uid} />
        <Link to={`/post/${id}`}>
          <PostContent text={text} />
        </Link>
        {imageUrl && thumbnailUrl ? (
          <PostImage
            averageColor={averageColor}
            id={id}
            imageUrl={imageUrl}
            thumbnailUrl={thumbnailUrl}
          />
        ) : null}
        <PostFooter
          likedByUsers={likedByUsers}
          user={user}
          id={id}
          parent={parent}
          numberOfComments={numberOfComments}
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
