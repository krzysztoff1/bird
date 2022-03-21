const PostContent = ({ text }) => {
  return (
    <p className="mt-2 overflow-hidden truncate text-ellipsis text-xl text-gray-700 dark:text-slate-200">
      {text}
    </p>
  );
};

export default PostContent;
