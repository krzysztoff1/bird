import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Settings from "../pages/Settings";
import Activity from "../pages/Activity";
import SinglePost from "../pages/SinglePost";
import NewPost from "../components/forms/NewPost";
import NotFound from "../pages/NotFound";

const routes = () => {
  return (
    <BrowserRouter>
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
        <Route component={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
