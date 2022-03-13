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
import { useLocation } from "react-router";
import LaunguageDropdown from "../i18n/LaunguageDropdown";

const PostsList = () => {
  const location = useLocation();
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

  //
  const q = query(collection(db, "cities"), where("state", "==", "CA"));
  onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
      }

      const source = snapshot.metadata.fromCache ? "local cache" : "server";
    });
  });
  //
  useEffect(() => {
    // if (localStorage["feed"] != null) console.log("is");
    const feedFromCache = localStorage.getItem("feed");
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
  }, [following, numberOfPosts]);

  useEffect(() => {
    // console.log(posts);
    // console.log(JSON.stringify(posts));
    // console.log(localStorage);
    // console.table(localStorage.getItem("feed"));
  }, [posts]);

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
  // window.onscroll = function (ev) {
  //   if (
  //     window.innerHeight + window.scrollY >=
  //     document.body.offsetHeight - 200
  //   ) {
  //     setNumberOfPosts((state) => state + 5);
  //   }
  // };

  if (isEmpty) return <p className="text-white">No posts yet</p>;
  if (!posts)
    return Array(6)
      .fill()
      .map((item, i) => <PostSkeleton key={i} />);

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
