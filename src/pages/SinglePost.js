import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import HighlightedPost from "../components/post/highlightedPost/HighlightedPost";
import NewComment from "../components/forms/NewComment";
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
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/firebase";
import { useTranslation } from "react-i18next";

const SinglePost = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [post, setPost] = useState();
  const [profileImage, setProfileImage] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [isEmpty, setIsEmpty] = useState(false);

  async function getProfileImage() {
    const user = await getCurrentUser();
    const postRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(postRef);
    setProfileImage(docSnap.data().googleProfilePicture);
  }
  getProfileImage();
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
    <div className="bg-slate-900 pt-20 min-h-screen pb-16">
      {post ? (
        <HighlightedPost
          parent
          id={id}
          uid={post.uid}
          account={post.account}
          time={post.timestamp}
          text={post.text}
          likedByUsers={post.likedByUsers}
          imageUrl={post.imageUrl}
          thumbnailUrl={post.thumbnailUrl}
        />
      ) : null}
      <NewComment parentId={id} post={post} profileImage={profileImage} />
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
            <p className="text-slate-100 font-bold text-center">
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
            />
          ))}
        </InfiniteScroll>
      ) : (
        <p className="text-slate-200 text-center mx-auto my-4">
          {t("no_comments_yet")}
        </p>
      )}
    </div>
  );
};

export default SinglePost;

  