import ProfileHeader from "../components/profile/ProfileHeader";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { isFollowed } from "../services/firebase";
import "flowbite";
import { db } from "../lib/firebase";
import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import {
  collection,
  onSnapshot,
  orderBy,
  doc,
  limit,
  where,
  query,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserByUid } from "../services/firebase";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [tab, setTab] = useState("posts");

  useEffect(() => {
    getUserByUid(uid).then((res) => setUserData(res));
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
  }, [numberOfPosts, uid, tab]);

  if (!userData) return <></>;

  return (
    <div className="bg-slate-900 min-h-screen">
      <ProfileHeader
        profilePicture={userData.googleProfilePicture}
        account={userData.name}
        uid={uid}
      />

      <div className="border-b sm:max-w-md mx-auto border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li onClick={() => setTab("posts")} className="mr-2">
            <p
              className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                tab === "posts"
                  ? "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Posts
            </p>
          </li>
          <li onClick={() => setTab("comments")} className="mr-2">
            <p
              className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                tab === "comments"
                  ? "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
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
          <p className="text-slate-100 font-bold text-center">
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
