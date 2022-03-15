import { db } from "../../lib/firebase";
import Post from "../post/Post";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import Spinner from "../loaders/Spinner";
import useFollowing from "../../hooks/useFollowing";

const PostsList = () => {
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasMore, toggleHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState();
  const [lastVisible, setLastVisible] = useState();
  const { users, pending } = useFollowing();

  useEffect(() => {
    if (pending) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "in", users),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
      { includeMetadataChanges: true },
      (snapshot) => {
        if (snapshot.size === 0) return setIsEmpty(true);
        if (snapshot.size !== 0) setIsEmpty(false);
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
  }, [users, numberOfPosts, pending]);

  if (isEmpty) return <p className="text-white">No posts yet</p>;

  if (!posts)
    return (
      <div className="my-12 flex items-center justify-center">
        <Spinner />;
      </div>
    );

  return (
    <InfiniteScroll
      dataLength={numberOfPosts}
      next={() => setNumberOfPosts(numberOfPosts + 10)}
      hasMore={hasMore}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          averageColor={post.averageColor}
          uid={post.uid}
          account={post.account}
          time={post.timestamp}
          text={post.text}
          likedByUsers={post.likedByUsers}
          commentedByUsers={post?.commentedByUsers}
          imageUrl={post.imageUrl}
          thumbnailUrl={post.thumbnailUrl}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
