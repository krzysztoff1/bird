import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";

const PostImage = ({ imageUrl, thumbnailUrl, id }) => {
  return (
    <Link to={`/post/${id}/photo`}>
      <div className="mt-3 overflow-hidden rounded-xl">
        <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
          {(src) => <img className="w-full" src={src} alt="" />}
        </ProgressiveImage>
      </div>
    </Link>
  );
};

export default PostImage;
