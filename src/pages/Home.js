import { isMobile } from "react-device-detect";
import { useLocation } from "react-router";
import Feed from "../components/feed/Feed";
import PostsList from "../components/feed/PostsList";
import FloatingButton from "../components/floatingButton/FloatingButton";
import LaunguageDropdown from "../components/i18n/LaunguageDropdown";

const Home = () => {
  let location = useLocation();

  return (
    <main
      className={`${
        location.pathname.includes("post") && "overflow-hidden"
      } min-h-screen bg-slate-100 dark:bg-slate-900`}
    >
      <LaunguageDropdown />
      {isMobile && !location.pathname.includes("post") && <FloatingButton />}
      <header className="sticky top-0 z-50 bg-slate-900/50 py-2 px-4 font-bold tracking-wide text-white backdrop-blur-md">
        Główna
      </header>
      <PostsList />
    </main>
  );
};

export default Home;
