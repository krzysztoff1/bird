import ProgressiveImage from "react-progressive-graceful-image";

const PostImage = ({ imageUrl, thumbnailUrl }) => {
  return (
    <div className="rounded-md overflow-hidden mt-1">
      {imageUrl && thumbnailUrl ? (
        <ProgressiveImage src={imageUrl} placeholder={thumbnailUrl}>
          {(src) => <img className="w-full" src={src} alt="" />}
        </ProgressiveImage>
      ) : null}
    </div>
  );
};

export default PostImage;
