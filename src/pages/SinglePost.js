import Post from "../components/post/Post";
import PostSkeleton from "../components/post/PostSkeleton";
import NewComment from "../components/forms/NewComment";
import Comments from "../components/comment/Comments";
import { db } from "../lib/firebase";
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
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);
  const [isEmpty, setIsEmpty] = useState(false);

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

  console.log(isEmpty);

  return (
    <div className="bg-slate-900 min-h-screen">
      {post ? (
        <Post
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
      <div className="w-full h-1 bg-slate-700 mx-auto max-w-md" />
      <NewComment parentId={id} />
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
          No comments yet
        </p>
      )}
    </div>
  );
};

export default SinglePost;
