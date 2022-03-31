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
import { TabletView } from "react-device-detect";

const tabs = [
  {
    title: "Recent",
    orderBy: "timestamp",
    direction: "desc",
    comment: false,
  },
  {
    title: "Popular",
    orderBy: "likedByUsers",
    direction: "desc",
    comment: false,
  },
  {
    title: "Comments",
    orderBy: "timestamp",
    direction: "desc",
    comment: true,
  },
];

const sortByList = [
  { title: "Recent", orderBy: "timestamp", direction: "desc" },
  { title: "Most Popular", orderBy: "likedByUsers", direction: "desc" },
];

const Profile = () => {
  const { uid } = useParams();
  const authState = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [activeTab, setActiveTab] = useState({
    title: "Recent",
    orderBy: "timestamp",
    direction: "desc",
    comment: false,
  });
  const [sortBy, setSortBy] = useState(sortByList[0]);

  const { ref, inView } = useInView();

  useEffect(() => {
    setLoading(false);
  }, [posts]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserByUid(uid);
      setUserData(res);
    };
    fetchUserData();
  }, [uid]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", activeTab.comment),
        where("uid", "==", uid),
        limit(numberOfPosts),
        orderBy(activeTab.orderBy, activeTab.direction)
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
  }, [numberOfPosts, uid, activeTab, authState]);

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
      <span ref={ref} />
      <section className="flex justify-between">
        <ul className="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {tabs.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab.title === tab.title
                  ? "text-bold border-emerald-400 bg-slate-800"
                  : "border-transparent"
              } inline-block rounded-t-lg border-b p-4 transition hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              {tab.title}
            </button>
          ))}
        </ul>
      </section>
      {!loading ? (
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
      ) : (
        <div className="flex w-full justify-center py-16">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default Profile;
