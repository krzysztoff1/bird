import "./index.css";
import AppLogo from "./components/loaders/AppLogo";
import AuthForm from "./pages/Auth";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/auth-context";
import ProfileSetup from "./pages/ProfileSetup";
import { ProfileFlowProvider } from "./context/profileFlow-context";
import TimeAgo from "javascript-time-ago";
import pl from "javascript-time-ago/locale/en.json";

const Home = lazy(() => import("./pages/Home"));
const Activity = lazy(() => import("./pages/Activity"));
const SmallNewPost = lazy(() => import("./components/forms/NewPost"));
const SideBar = lazy(() => import("./components/sidebar/SideBar"));
const Nav = lazy(() => import("./components/nav/Nav"));
const MobileNav = lazy(() => import("./components/nav/MobileNav"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const Profile = lazy(() => import("./pages/Profile"));
const Messages = lazy(() => import("./pages/Messages"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

TimeAgo.addDefaultLocale(pl);

function App() {
  const AuthState = useContext(AuthContext);

  document.documentElement.classList.add("dark");

  if (!AuthState.currentUser) return <AuthForm />;

  return (
    <Suspense fallback={<AppLogo />}>
      <div className="bg-white dark:bg-slate-900">
        <BrowserRouter>
          <div className="mx-auto flex max-w-6xl">
            {isBrowser ? <Nav /> : <MobileNav />}
            <main className="flex-grow-1  mr-0 w-full max-w-full justify-center border-r-[1px] border-slate-100 dark:border-slate-200/30  sm:mr-0 md:mr-12 md:max-w-lg">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  path="/post/:id"
                  element={
                    <>
                      <Home />
                      <SinglePost />
                    </>
                  }
                />
                <Route path="/profile/:uid" element={<Profile />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/compose/post" element={<SmallNewPost />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/flow/profile_setup"
                  element={
                    <>
                      <ProfileFlowProvider>
                        <ProfileSetup />
                      </ProfileFlowProvider>
                      <Profile />
                    </>
                  }
                />
                <Route element={<NotFound />} />
              </Routes>
            </main>
            {isBrowser && <SideBar />}
          </div>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
