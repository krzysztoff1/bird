import { db } from "../../lib/firebase";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../../services/firebase";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isOpen, toggleIsOpen] = useState();
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("compose")) return toggleIsOpen(false);
    toggleIsOpen(true);
  }, [location]);

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "notifications"),
        where("uid", "==", user.uid),
        where("read", "==", false),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (snapshot.size !== 0) return setNotifications(true);
        setNotifications(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const variants = {
    open: { y: 0 },
    closed: { y: "100%" },
  };

  const list = [
    {
      title: "home",
      url: "/",
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
    },
    {
      title: "discover",
      url: "/discover",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "activity",
      url: "/activity",
      icon: (
        <>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          {notifications ? (
            <div className="absolute h-3 w-3 -translate-y-7 rounded-full border-2 border-slate-900 bg-green-400"></div>
          ) : null}
        </>
      ),
    },
    {
      title: "profile",
      url: "/user/profile",
      icon: (
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.nav
        variants={variants}
        animate={isOpen ? "open" : "closed"}
        className="fixed bottom-0 z-50 flex w-[100vw] justify-around overflow-y-auto bg-slate-200/60 px-3 py-3 backdrop-blur-xl dark:bg-slate-900/30"
      >
        {list.map((item) => (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#34d399" : "",
              };
            }}
            className="relative rounded-full p-2 text-slate-800 dark:text-slate-100 sm:hover:bg-teal-200 sm:hover:text-teal-500"
            to={item.url}
          >
            {item.icon}
          </NavLink>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
};

export default Nav;
