import FloatingButton from "../components/buttons/FloatingButton";
import SmallNewPost from "../components/forms/SmallNewPost";
import Header from "../components/header/Header";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router";
import { lazy, Suspense } from "react";
import { UploadPostProvider } from "../context/upload-context";

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
      <Header text="Główna" scrollToTop />
      {!isMobile && (
        <UploadPostProvider>
          <SmallNewPost post />
        </UploadPostProvider>
      )}
      <Suspense fallback={<>Loading...</>}>
        <PostsList />
      </Suspense>
    </div>
  );
};

export default Home;
