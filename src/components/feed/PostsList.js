import Post from "../post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../loaders/Spinner";
import useFeed from "../../hooks/useFeed";

const PostsList = () => {
  const { state, fetchMoreData } = useFeed();

  if (state.status === "loading" || state.status === "idle")
    return (
      <div className="my-12 flex items-center justify-center">
        <Spinner />;
      </div>
    );

  if (!state.data.length) return <p className="text-white">No posts yet</p>;

  return (
    <InfiniteScroll
      dataLength={state.data.length}
      next={() => fetchMoreData()}
      hasMore={true}
    >
      {state.data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          link={post?.link}
          averageColor={post.averageColor}
          uid={post.uid}
          accountName={post.userName}
          account={post.account}
          time={post.timestamp}
          text={post.text}
          likedByUsers={post.likedByUsers}
          commentedByUsers={post?.commentedByUsers}
          imageUrl={post.imageUrl}
          thumbnailUrl={post.thumbnailUrl}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
