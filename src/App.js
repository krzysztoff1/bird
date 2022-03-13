import "./index.css";
import AppLogo from "./components/loaders/AppLogo";
import { BrowserView, MobileView } from "react-device-detect";
import * as rdd from "react-device-detect";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import NewPost from "./components/forms/NewPost";
import Settings from "./pages/Settings";
import Photo from "./pages/Photo";
import AuthForm from "./pages/Auth";
import Activity from "./pages/Activity";
import MobileNav from "./components/nav/MobileNav";
import Header from "./components/header/Header";
import { NavigationProvider } from "./context/NavigationContext";
import { AuthContext } from "./context/auth-context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import Messages from "./pages/Messages";

function App() {
  const AuthState = useContext(AuthContext);

  //! testing
  document.documentElement.classList.add("dark");
  //!

  if (!AuthState.currentUser) return <AuthForm />;

  return (
    <BrowserRouter>
      <NavigationProvider>
        {/* <BrowserView></BrowserView> */}
        {/* <MobileView></MobileView> */}
        <Header />
        <MobileNav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/user/profile" element={<Settings />} />
          <Route path="/activity" element={<Activity />} />
          <Route
            path="/post/:id"
            element={
              <>
                <Home />
                <SinglePost />
              </>
            }
          />
          {/* <Route path="/post/:id/photo" element={<Photo />} /> */}
          <Route path="/compose/post" element={<NewPost />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
