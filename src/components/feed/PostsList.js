import Post from "../post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../loaders/Spinner";
import useFeed from "../../hooks/useFeed";
import PersonLink from "../sidebar/PersonLink";
import { isMobile } from "react-device-detect";

const PostsList = () => {
  const { state, fetchMoreData } = useFeed();

  const people = [
    { id: 1, title: "Krzysztof", uid: "sGdpDpyhEfb25VaLXrmvAFqcFfs1" },
    { id: 2, title: "TestAccountThree", uid: "d9PCpTwMYqNKNJEXDF4IMPZlnQf2" },
  ];

  if (state.status === "loading" || state.status === "idle")
    return (
      <div className="my-12 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (!state.data.length)
    return (
      <>
        <p className="my-12 text-center font-medium text-black dark:text-white">
          No posts yet
          <br />
          follow someone {isMobile ? "👇" : "👉"}
        </p>
        {isMobile &&
          people.map((person) => (
            <PersonLink key={person.id} person={person} />
          ))}
      </>
    );

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
          linkData={post.linkData}
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
          hashtags={post.hashtags}
          repostedPostId={post.repostedPostId}
          repostedBy={post.repostedBy}
        />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
