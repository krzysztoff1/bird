import ProfileHeader from "../components/profile/ProfileHeader";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import {
  collection,
  onSnapshot,
  doc,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import Header from "../components/header/Header";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [tab, setTab] = useState("posts");
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
      setUserData(doc.data());
    });
    return () => unsubscribe();
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
  }, [numberOfPosts, uid, tab]);

  if (!userData) return <Loading />;

  return (
    <div className="min-h-screen">
      <Header>
        <button
          onClick={() => window.history.go(-1)}
          className="w-6 rounded-full p-1 transition-all hover:bg-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-100"
            fill="none"
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
          {userData.name}
        </motion.p>
        <span className="w-6" />
      </Header>
      <ProfileHeader
        profilePicture={
          !userData.profilePicture
            ? userData.googleProfileImage
            : userData.profilePicture
        }
        account={userData.name}
        following={userData.following}
        followedBy={userData.followedBy}
        uid={uid}
        description={userData.description}
      />
      <span ref={ref}></span>
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
