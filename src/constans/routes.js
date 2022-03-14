import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { Route, BrowserRouter } from "react-router-dom";
import EditProfile from "../pages/EditProfile";
import Activity from "../pages/Activity";
import SinglePost from "../pages/SinglePost";
import SmallNewPost from "../components/forms/NewPost";
import NotFound from "../pages/NotFound";

const Routes = () => {
  return (
    <>
      <Route exact path="/" element={<Home />} />
      <Route path="/profile/:uid" element={<Profile />} />
      <Route path="/user/profile" element={<EditProfile />} />
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
      <Route path="/compose/post" element={<SmallNewPost />} />
      <Route component={<NotFound />} />
    </>
  );
};

export default Routes;
