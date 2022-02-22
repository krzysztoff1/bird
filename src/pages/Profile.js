import ProfileHeader from "../components/profile/ProfileHeader";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { isFollowed } from "../services/firebase";
import { db } from "../lib/firebase";
import Post from "../components/feed/post/Post";
import PostSkeleton from "../components/feed/post/PostSkeleton";
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
  }, [numberOfPosts, uid]);

  const fetchMoreData = () => setNumberOfPosts(numberOfPosts + 5);

  if (!userData) return <></>;

  return (
    <>
      <ProfileHeader
        profilePicture={userData.googleProfilePicture}
        account={userData.name}
        uid={uid}
      />
      <InfiniteScroll
        dataLength={numberOfPosts}
        next={fetchMoreData}
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
    </>
  );
};
export default Profile;
