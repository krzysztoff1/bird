module.exports = {
  content: [
    "./src/App.js",
    "./src/pages/SignIn.js",
    "./src/pages/Loading.js",
    "./src/components/forms/NewPost.js",
    "./src/components/feed/Feed.js",
    "./src/components/feed/PostsList.js",
    "./src/components/feed/post/PostSkeleton.js",
    "./src/components/feed/post/Post.js",
    "./src/components/profile/ProfileHeader.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
