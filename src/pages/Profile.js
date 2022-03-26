import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { AuthContext } from "../context/auth-context";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileHeader from "../components/profile/ProfileHeader";
import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import Header from "../components/header/Header";
import Spinner from "../components/loaders/Spinner";
import { getUserByUid } from "../services/firebase";

const Profile = () => {
  const { uid } = useParams();
  const authState = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [userData, setUserData] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [tab, setTab] = useState("posts");
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserByUid(uid);
      setUserData(res);
    };
    fetchUserData();
  }, [uid]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "==", uid),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
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
  }, [numberOfPosts, uid, tab, authState]);

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  if (!userData) return <Spinner />;

  return (
    <div className="min-h-screen">
      <Header>
        <button
          onClick={() => window.history.go(-1)}
          className="w-6 rounded-full p-1 transition-all hover:bg-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black dark:text-white"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <motion.p
          animate={{
            opacity: inView ? 0 : 1,
          }}
          initial={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0.1 }}
        >
          {authState.userData.name}
        </motion.p>
        <span className="w-6" />
      </Header>
      <ProfileHeader
        profilePicture={userData?.profilePicture}
        account={userData?.name}
        following={userData?.following}
        followedBy={userData?.followedBy}
        description={userData?.description}
        uid={uid}
      />
      {/* //TODO remove this span, forward ref to profileHeader */}
      <span ref={ref} />
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
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default Profile;
