import { useLocation } from "react-router";
import Feed from "../components/feed/Feed";
import FloatingButton from "../components/floatingButton/FloatingButton";
import LaunguageDropdown from "../components/i18n/LaunguageDropdown";

const Home = () => {
  let location = useLocation();
console.log(location.pathname.includes("post"));

return (
  <section
    className={`${
      location.pathname.includes("post") && "overflow-hidden"
    } min-h-screen bg-slate-100 py-10 dark:bg-slate-900`}
  >
    <LaunguageDropdown />
    {!location.pathname.includes("post") && <FloatingButton />}
    <Feed />
  </section>
);
};

export default Home;
