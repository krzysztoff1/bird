import Post from "../post/Post";
import PostSkeleton from "../post/PostSkeleton";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [totalComments, setTotalComments] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), where("parentId", "==", id)),
      (snapshot) => {
        setTotalComments(snapshot.size);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("parentId", "==", id),
        limit(2),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        console.log(snapshot.size);
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
      {totalComments > 2 ? (
        <Link to={`/post/${id}`}>
          <p className="hover:underline max-w-md mx-auto text-center text-blue-500">
            Show all comments ({totalComments})
          </p>
        </Link>
      ) : null}
    </div>
  );
};

export default Comments;
