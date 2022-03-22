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
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/auth-context";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
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
      name: t("home"),
      url: "/",
      icon: (
        <svg
          className="h-6 w-6 "
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
    },
    {
      name: t("activity"),
      url: "/activity",
      icon: (
        <>
          <svg
            className="h-6 w-6 "
            viewBox="0 0 20 20"
            fill="currentColor"
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
      name: t("messages"),
      url: "/messages",
      icon: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: t("settings"),
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      url: "/settings",
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
            key={item.url}
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
