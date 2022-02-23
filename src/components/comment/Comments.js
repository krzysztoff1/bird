import Post from "../post/Post";
import PostSkeleton from "../post/PostSkeleton";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  doc,
  limit,
  where,
  query,
} from "firebase/firestore";

const Comments = ({
  account,
  text,
  likedByUsers,
  time,
  id,
  uid,
  thumbnailUrl,
  imageUrl,
}) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("parentId", "==", id),
        limit(2),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [id]);

  if (!posts) return <PostSkeleton />;

  return (
    <div>
      <Post
        key={id}
        id={id}
        uid={uid}
        account={account}
        time={time}
        text={text}
        likedByUsers={likedByUsers}
        imageUrl={imageUrl}
        thumbnailUrl={thumbnailUrl}
      />
      {posts.map((post) => (
        <Post
          inlineComment
          key={post.id}
          id={post.id}
          uid={post.uid}
          account={post.account}
          time={post.timestamp}
          text={post.text}
          likedByUsers={post.likedByUsers}
          imageUrl={post.imageUrl}
          thumbnailUrl={post.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default Comments;
