import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Post from "../components/post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../components/post/PostSkeleton";
import Header from "components/header/Header";

const Hashtags = () => {
  const { hashtag } = useParams();
  const [posts, setPosts] = useState();
  const [empty, toggleEmpty] = useState(false);
  const [numberOfPosts, setNumberOfPosts] = useState(7);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("hashtags", "array-contains", `#${hashtag}`),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (!snapshot.size) return toggleEmpty(true);
        setPosts(
          snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [numberOfPosts]); // eslint-disable-line

  if (empty)
    return <p className="my-4 text-center text-black dark:text-white">Empty</p>;

  return (
    <section className=" min-h-screen text-black dark:text-white">
      <Header text={`#${hashtag}`} />
      <div className="overflow-y-scroll">
        <InfiniteScroll
          dataLength={numberOfPosts}
          next={() => setNumberOfPosts(numberOfPosts + 5)}
          hasMore={true}
          loader={Array(3)
            .fill()
            .map((item, i) => (
              <PostSkeleton key={i} />
            ))}
          endMessage={
            <p className="text-center font-bold text-slate-100">
              Yay! You have seen it all
            </p>
          }
        >
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              uid={post.uid}
              account={post.account}
              time={post.timestamp}
              averageColor={post.averageColor}
              text={post.text}
              likedByUsers={post.likedByUsers}
              imageUrl={post.imageUrl}
              thumbnailUrl={post.thumbnailUrl}
              hashtags={post.hashtags}
            />
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default Hashtags;
