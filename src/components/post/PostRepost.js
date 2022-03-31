import { Suspense } from "react";
import { useState, useEffect } from "react";
import { getPostById } from "services/firebase";
import Post from "./Post";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const PostRepost = (props) => {
  const [post, setPost] = useState();

  useEffect(() => {
    getPostById(props.repostedPostId).then((res) => setPost(res));
  }, []);

  if (!post) return <>Loading</>;

  return (
    <article className="p-3">
      <PostHeader
        accountName={props.accountName}
        account={props.account}
        time={props.time}
        uid={props.uid}
      />
      <div className="my-2 rounded-xl border border-slate-600">
        <Post
          repost
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
        />
      </div>
      <PostFooter
        commentedByUsers={props.commentedByUsers}
        likedByUsers={props.likedByUsers}
        id={props.id}
        parent={props.parent}
      />
    </article>
  );
};

export default PostRepost;
