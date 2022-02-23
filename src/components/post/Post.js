import PostAside from "./PostAside";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import { getCurrentUser, getUserByUid } from "../../services/firebase";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const Post = ({
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
    getUserByUid(uid).then((res) =>
      setProfilePicture(res.googleProfilePicture)
    );
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
        inlineComment ? "pl-8 border-r-2 border-t-0" : "mt-2 "
      } dark:border-slate-800 border-slate-300
          inlineComment flex flex-grow p-3 w-full bg-slate-900 max-w-md mx-auto border rounded-md sm:hover:shadow-xl shadow-slate-500"`}
    >
      <PostAside
        inlineComment={inlineComment}
        uid={uid}
        profilePicture={profilePicture}
      />
      <div className="w-full">
        <PostHeader account={account} time={time} uid={uid} />
        <PostContent text={text} />
        <PostImage imageUrl={imageUrl} thumbnailUrl={thumbnailUrl} />
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
