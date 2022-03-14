import "./index.css";
import AppLogo from "./components/loaders/AppLogo";
import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";
import * as rdd from "react-device-detect";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SinglePost from "./pages/SinglePost";
import SmallNewPost from "./components/forms/NewPost";
import EditProfile from "./pages/EditProfile";
import Photo from "./pages/Photo";
import NotFound from "./pages/NotFound";
import AuthForm from "./pages/Auth";
import Activity from "./pages/Activity";
import MobileNav from "./components/nav/MobileNav";
import Header from "./components/header/Header";
import { NavigationProvider } from "./context/NavigationContext";
import { AuthContext } from "./context/auth-context";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useContext } from "react";
import Messages from "./pages/Messages";
import Nav from "./components/nav/Nav";
import Layout from "./components/Layout";

const SideBar = lazy(() => import("./components/sidebar/SideBar"));

const styles = {
  background: "#000",
  width: "2px",
  cursor: "col-resize",
  margin: "0 5px",
  height: "100%",
};

function App() {
  const AuthState = useContext(AuthContext);

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  }

  if (!AuthState.currentUser) return <AuthForm />;

  return (
    <div className="bg-white dark:bg-slate-900">
      <BrowserRouter>
        <NavigationProvider>
          <div className="mx-auto flex max-w-7xl">
            {isBrowser && <Nav />}
            {isMobile && <MobileNav />}
            <main className="flex-grow-1 w-full">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/profile/:uid" element={<Profile />} />
                <Route path="/user/profile" element={<EditProfile />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/compose/post" element={<SmallNewPost />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route element={<NotFound />} />
              </Routes>
            </main>
            {isBrowser && (
              <Suspense fallback={<>Loading...</>}>
                <SideBar />
              </Suspense>
            )}
          </div>
        </NavigationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
