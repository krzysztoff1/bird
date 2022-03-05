import { db } from "../../lib/firebase";
import { getFollowed } from "../../services/firebase";
import PostSkeleton from "../post/PostSkeleton";
import Post from "../post/Post";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";

const PostsList = () => {
  const [posts, setPosts] = useState();
  const [following, setFollowing] = useState([]);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasMore, toggleHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState();
  const [lastVisible, setLastVisible] = useState();

  useEffect(() => {
    getFollowed().then((res) => setFollowing(res));
  }, []);

  useEffect(() => {
    if (!following.length) return;
    const getTotalPosts = async () => {
      const data = query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "in", following)
      );
      const documentSnapshots = await getDocs(data);
      setTotalPosts(documentSnapshots.size);
    };
    getTotalPosts();
  }, [following]);

  useEffect(() => {
    if (!following.length) return;
    if (posts && totalPosts === posts?.length) return toggleHasMore(false);
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

  useEffect(() => {
    // if (!following.length) return;
    // const first = onSnapshot(
    //   query(
    //     collection(db, "posts"),
    //     where("comment", "==", false),
    //     where("uid", "in", following),
    //     orderBy("timestamp", "desc"),
    //     limit(6)
    //   ),
    //   (snapshot) => {
    //     setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    //     setPosts(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }))
    //     );
    //   }
    // );
    // return () => first();
  }, [following]);

  // const getMorePosts = async () => {
  //   console.log("====================================");
  //   console.log("next");
  //   console.log("====================================");
  //   if (!lastVisible) return toggleHasMore(false);
  //   setNumberOfPosts(numberOfPosts + 20);
  //   const next = onSnapshot(
  //     query(
  //       collection(db, "posts"),
  //       where("comment", "==", false),
  //       where("uid", "in", following),
  //       orderBy("timestamp", "desc"),
  //       startAfter(lastVisible),
  //       limit(2)
  //     ),
  //     (snapshot) => {
  //       setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  //       setPosts((posts) => [
  //         ...posts,
  //         ...snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         })),
  //       ]);
  //     }
  //   );
  //   return () => next();
  // };
  window.onscroll = function (ev) {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setNumberOfPosts((state) => state + 5);
    }
  };

  if (isEmpty) return <p className="text-white">No posts yet</p>;
  if (!posts)
    return Array(6)
      .fill()
      .map((item, i) => <PostSkeleton key={i} />);

  return (
    <>
      <section>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            uid={post.uid}
            account={post.account}
            time={post.timestamp}
            text={post.text}
            likedByUsers={post.likedByUsers}
            // imageUrl={post.imageUrl}
            // thumbnailUrl={post.thumbnailUrl}
          />
        ))}
        <p className="font-xl my-5 text-center text-slate-50">
          Thats all folks
        </p>
      </section>
      <nav aria-label="pagination" className="w-full pb-16">
        <ul className="mx-auto inline-flex -space-x-px">
          <li>
            <button
              type="button"
              className="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </button>
          </li>
          <li>
            <button
              type="button"
              // onClick={() => getMorePosts()}
              className="border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              next
            </button>
          </li>
        </ul>
      </nav>
      {/* <InfiniteScroll
        dataLength={numberOfPosts}
        next={() => getMorePosts()}
        hasMore={hasMore}
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
            // imageUrl={post.imageUrl}
            // thumbnailUrl={post.thumbnailUrl}
          />
        ))}
      </InfiniteScroll> */}
    </>
  );
};;

export default PostsList;
