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
import { getUserByUid } from "../services/firebase";
import Loading from "./Loading";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [tab, setTab] = useState("posts");

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
    <div className="min-h-screen bg-slate-900">
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
      <div className="mx-auto border-b border-gray-200 dark:border-gray-700 sm:max-w-md">
        <ul className="-mb-px flex flex-wrap">
          <li onClick={() => setTab("posts")} className="mr-2">
            <p
              className={`inline-block py-4 px-4 text-center text-sm font-medium ${
                tab === "posts"
                  ? "active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "rounded-t-lg border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Posts
            </p>
          </li>
          <li onClick={() => setTab("comments")} className="mr-2">
            <p
              className={`inline-block py-4 px-4 text-center text-sm font-medium ${
                tab === "comments"
                  ? "active rounded-t-lg border-b-2 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                  : "rounded-t-lg border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Comments and posts
            </p>
          </li>
        </ul>
      </div>
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
