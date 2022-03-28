import { Link } from "react-router-dom";

const PostHashtags = ({ hashtags }) => {
  return (
    <div className="my-2 flex gap-2">
      {hashtags.map((hashtag) => (
        <Link
          key={hashtag}
          to={`/hashtag=${hashtag.substring(1)}`}
          className="rounded-full bg-blue-300 px-2 py-1 text-xs font-medium text-blue-900"
        >
          {hashtag}
        </Link>
      ))}
    </div>
  );
};

export default PostHashtags;
