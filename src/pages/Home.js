import FloatingButton from "../components/buttons/FloatingButton";
import SmallNewPost from "../components/forms/NewComment";
import Header from "../components/header/Header";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router";
import { lazy, Suspense } from "react";

const PostsList = lazy(() => import("../components/feed/PostsList"));

const Home = () => {
  let location = useLocation();

  return (
    <div
      className={`${
        location.pathname.includes("post") && "hidden"
      } min-h-screen `}
    >
      {isMobile && <FloatingButton />}
      <Header text="Główna" />
      {!isMobile && <SmallNewPost post />}
      <Suspense fallback={<>Loading...</>}>
        <PostsList />
      </Suspense>
    </div>
  );
};

export default Home;
