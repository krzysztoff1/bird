import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
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
import { useLocation } from "react-router";
import Feed from "../components/feed/Feed";

const getPosts = async () => {
  const following = await getFollowed();

  if (following.length) return "no posts to show";
  const data = query(
    collection(db, "posts"),
    where("comment", "==", false),
    where("uid", "in", following)
  );
  const documentSnapshots = await getDocs(data);
  const postsSize = await documentSnapshots.size;

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

  if (isOnline === null) {
    return "Ładowanie...";
  }
};

export default use - feed;
