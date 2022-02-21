import Post from "../components/feed/post/Post";
import NewPost from "../components/forms/NewPost";
import { useParams } from "react-router";
import PostSkeleton from "../components/feed/post/PostSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { getPostById } from "../services/firebase";
import NewComment from "../components/forms/NewComment";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [posts, setPosts] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState(7);

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
    console.log("====================================");
    console.log(post);
    console.log("====================================");
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("parentId", "==", id),
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
  }, [numberOfPosts, id]);

  let unsubscribe;

  function fetchMoreData() {
    setNumberOfPosts(numberOfPosts + 5);
  }

  if (!post && !posts && !id) return <p>Loading...</p>;

  return (
    <div>
      {post
        ? (console.log(post.id),
          (
            <Post
              parent
              id={post.id}
              uid={post.uid}
              account={post.account}
              time={post.timestamp}
              text={post.text}
              likedByUsers={post.likedByUsers}
              imageUrl={post.imageUrl}
              thumbnailUrl={post.thumbnailUrl}
            />
          ))
        : null}
      <NewComment id={id} />
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
    </div>
  );
};

export default SinglePost;
