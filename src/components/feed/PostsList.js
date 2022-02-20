import { db } from "../../lib/firebase";
import { getFollowed } from "../../services/firebase";
import PostSkeleton from "./post/PostSkeleton";
import Post from "./post/Post";
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
  const [following, setFollowing] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(10);

  useEffect(() => {
    getFollowed().then((res) => setFollowing(res));
  }, []);

  useEffect(() => {
    if (following) {
      onSnapshot(
        query(
          collection(db, "posts"),
          where("uid", "in", following),
          limit(numberOfPosts),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      );
    }
  }, [following]);

  function fetchMorePosts() {
    setNumberOfPosts((state) => state + 5);
  }

  if (!posts) {
    return Array(6)
      .fill()
      .map((item, i) => <PostSkeleton key={i} />);
  }

  return (
    <InfiniteScroll
      dataLength={numberOfPosts}
      next={fetchMorePosts}
      hasMore={true}
      loader={Array(1)
        .fill()
        .map((item, i) => (
          <PostSkeleton key={i} />
        ))}
      endMessage={
        <p className="text-slate-100 font-bold text-center">
          Yay! You have seen it all
        </p>
      }
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          uid={post.uid}
          time={post.timestamp}
          text={post.text}
          account={post.account}
          likedByUsers={post.likedByUsers}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
