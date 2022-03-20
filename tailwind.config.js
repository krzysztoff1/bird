module.exports = {
  darkMode: "class",
  content: [
    "./src/App.js",
    "./public/index.html",
    "./src/pages/Auth.js",
    "./src/pages/Home.js",
    "./src/pages/Profile.js",
    "./src/pages/EditProfile.js",
    "./src/pages/Loading.js",
    "./src/pages/SinglePost.js",
    "./src/pages/Settings.js",
    "./src/pages/Photo.js",
    "./src/pages/ProfileSetup.js",
    "./src/components/auth/SignInEmail.js",
    "./src/components/auth/SignInGoogle.js",
    "./src/components/loaders/Spinner.js",
    "./src/components/loaders/AppLogo.js",
    "./src/components/forms/NewPost.js",
    "./src/components/forms/NewComment.js",
    "./src/components/forms/profile/SetProfilePicture.js",
    "./src/components/forms/profile/SetDescription.js",
    "./src/components/forms/auth/LogIn.js",
    "./src/components/forms/auth/SignIn.js",
    "./src/components/forms/auth/SignInGoogle.js",
    "./src/components/feed/Feed.js",
    "./src/components/PostsList.js",
    "./src/components/header/Header.js",
    "./src/components/sidebar/SideBar.js",
    "./src/components/post/PostSkeleton.js",
    "./src/components/post/PostAside.js",
    "./src/components/post/PostHeader.js",
    "./src/components/post/PostContent.js",
    "./src/components/post/PostImage.js",
    "./src/components/post/PostLink.js",
    "./src/components/post/PostFooter.js",
    "./src/components/post/Post.js",
    "./src/components/post/highlightedPost/HighlightedPost.js",
    "./src/components/notifications/Notification.js",
    "./src/components/notifications/CommentNotification.js",
    "./src/components/floatingButton/FloatingButton.js",
    "./src/components/alerts/Alert.js",
    "./src/components/toast/Toast.js",
    "./src/components/toast/ToastPortal.js",
    "./src/components/modals/BottomModal.js",
    "./src/components/modals/Modal.js",
    "./src/components/nav/Nav.js",
    "./src/components/nav/MobileNav.js",
    "./src/components/comment/Comments.js",
    "./src/components/profile/ProfileHeader.js",
    "./src/components/profile/SettingsProfileHeader.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
