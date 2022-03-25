import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import HighlightedPost from "../components/post/highlightedPost/HighlightedPost";
import SmallNewPost from "../components/forms/SmallNewPost";
import Comments from "../components/comment/Comments";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  doc,
  limit,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useParams } from "react-router";
import { useContext, useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../services/firebase";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/auth-context";
import Header from "../components/header/Header";
import { UploadPostProvider } from "../context/upload-context";

const SinglePost = () => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState();
  const [profileImage, setProfileImage] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setPost(doc.data());
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("parentId", "==", id),
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
  }, [numberOfPosts, id]);

  return (
    // <article className="fixed top-0 bottom-0 min-h-screen min-w-[100vw] overflow-y-scroll bg-slate-900">

    <article className="h-full min-h-screen ">
      <Header>
        <motion.button
          onClick={() => window.history.go(-1)}
          className="rounded-full p-1 transition-all hover:bg-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black dark:text-white"
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
        </motion.button>
      </Header>
      <div className="mb-12 overflow-scroll">
        {post ? (
          <HighlightedPost
            parent
            id={id}
            uid={post.uid}
            account={post.account}
            time={post.timestamp}
            text={post.text}
            likedByUsers={post.likedByUsers}
            averageColor={post.averageColor}
            imageUrl={post.imageUrl}
            thumbnailUrl={post.thumbnailUrl}
            linkData={post.linkData}
          />
        ) : null}
        <UploadPostProvider>
          <SmallNewPost
            comment
            parentId={id}
            post={post}
            profileImage={
              authState.userData?.profilePicture
                ? authState.userData?.profilePicture
                : "https://apiprod7ga8u.tubadzin.pl/media/original_images/PS-Colour-Black_31R41tz.jpg"
            }
          />
        </UploadPostProvider>
        {!isEmpty ? (
          <InfiniteScroll
            dataLength={numberOfPosts}
            next={() => setNumberOfPosts(numberOfPosts + 5)}
            hasMore={true}
            loader={Array(1)
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
              <Comments
                key={post.id}
                id={post.id}
                uid={post.uid}
                account={post.account}
                time={post.timestamp}
                text={post.text}
                likedByUsers={post.likedByUsers}
                imageUrl={post.imageUrl}
                thumbnailUrl={post.thumbnailUrl}
                linkData={post.linkData}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <p className="mx-auto my-4 text-center text-slate-200">
            {t("no_comments_yet")}
          </p>
        )}
      </div>
    </article>
  );
};

export default SinglePost;

  