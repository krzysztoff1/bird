import { useEffect } from "react";
import Feed from "../components/feed/Feed";
import { SignOut } from "../services/firebase";
import Loading from "./Loading";

const Home = () => {
  return (
    <section className="bg-slate-900">
      <Feed />
    </section>
  );
};

export default Home;
