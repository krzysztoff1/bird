import { db } from "../../lib/firebase";
import { getFollowed } from "../../services/firebase";
import PostSkeleton from "../post/PostSkeleton";
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

const PostsList = () => {
  const [posts, setPosts] = useState();
  const [following, setFollowing] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getFollowed().then((res) => setFollowing(res));
  }, []);

  useEffect(() => {
    if (!following.length) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "in", following),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
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
  }, [following, numberOfPosts]);

  if (isEmpty) return <p className="text-white">No posts yet</p>;
  if (!posts)
    return Array(6)
      .fill()
      .map((item, i) => <PostSkeleton key={i} />);

  return (
    <InfiniteScroll
      dataLength={numberOfPosts}
      next={() => setNumberOfPosts(numberOfPosts + 10)}
      hasMore={true}
    >
      {posts.map((post) => (
        <Post
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
    </InfiniteScroll>
  );
};;

export default PostsList;
