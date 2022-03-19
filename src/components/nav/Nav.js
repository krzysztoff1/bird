import { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../../context/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { SignOut } from "../../services/firebase";

const Nav = () => {
  const authState = useContext(AuthContext);
  const [notifications, setNotifications] = useState(false);
  const [settings, toggleSettings] = useState(false);
  const [isOpenFooter, toggleIsOpenFooter] = useState(false);

useEffect(() => {
  if (!authState.currentUser) return;
  const unsubscribe = onSnapshot(
    query(
      collection(db, "notifications"),
      where("uid", "==", authState.currentUser.uid),
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
}, [authState]);

const items = [
  {
    name: "Home",
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
    name: "Activity",
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
          <div className="absolute h-3 w-3 -translate-y-2 rounded-full border-2 border-slate-900 bg-green-400"></div>
        ) : null}
      </>
    ),
  },
  {
    name: "Wiadomości",
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
];

const menuItems = [
  { name: "theme", url: "/" },
  { name: "language", url: "/" },
  { name: "Settings", url: "/settings" },
  { name: "About", url: "/" },
];

const variants = {
  open: {
    opacity: 1,
    height: "auto",
    y: 0,
  },
  collapsed: { opacity: 0, height: 0, y: 30 },
};

return (
  <nav className="w-fit border-r-[1px] border-slate-100 dark:border-slate-800">
    <div className="sticky top-0 mx-0 flex h-screen flex-col items-center justify-between overflow-y-hidden sm:items-start md:mx-6">
      <header className="left-0 z-50 mx-1 flex w-full flex-col items-center justify-around gap-3 overflow-y-auto  px-0 py-3 backdrop-blur-xl dark:bg-slate-900/30 sm:px-4 md:items-start">
        <NavLink className="mb-6 w-fit p-2" to="/">
          <img className="h-6 w-6" src="./assets/svg/logo.svg" alt="logo" />
        </NavLink>
        {items.map((item) => (
          <NavLink
            key={item.name}
            style={({ isActive }) => {
              return {
                color: isActive ? "#34d399" : "",
              };
            }}
            className="flex items-center rounded-lg p-2 text-black transition-all hover:bg-slate-700/30 dark:text-white md:pr-4"
            to={item.url}
          >
            {item.icon}
            <p className="ml-3 hidden md:block">{item.name}</p>
          </NavLink>
        ))}
        <div>
          <button
            onClick={() => toggleSettings((state) => !state)}
            className="flex items-center rounded-lg p-2 text-slate-800 outline-none transition-all hover:bg-slate-700/30 dark:text-slate-100 md:pr-4"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 hidden md:block">Więcej</p>
          </button>
          <motion.div
            variants={variants}
            initial={settings ? "open" : "collapsed"}
            animate={settings ? "open" : "collapsed"}
            inherit={false}
            className={`list-none`}
          >
            <ul className="w-full py-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#34d399" : "",
                    };
                  }}
                  className="flex items-center rounded-lg p-2 text-black outline-none transition-all hover:bg-slate-700/30 dark:text-white md:pr-4"
                  to={item.url}
                >
                  <p className="ml-3 hidden md:block">{item.name}</p>
                </NavLink>
              ))}
            </ul>
          </motion.div>
        </div>
        <NavLink
          className="m-2 flex scale-110 items-center justify-center rounded-full bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 dark:text-slate-100 sm:px-4"
          to="/compose/post"
        >
          <svg
            className="h-6 w-6 text-white md:hidden"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <p className="hidden text-center md:block">Tweetnij</p>
        </NavLink>
      </header>
      <footer className="relative">
        <AnimatePresence>
          {isOpenFooter && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute -top-44 z-[500] ml-2 w-64 overflow-hidden rounded-md border border-slate-200 bg-white text-black shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <header
                className="w-full p-2"
                onClick={() => toggleIsOpenFooter(false)}
              >
                <svg
                  className="h-8 w-8 rounded-full p-1 transition hover:bg-neutral-200 dark:hover:bg-slate-700"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </header>
              <hr className="border-t border-slate-200 dark:border-slate-600" />
              <Link to={`/profile/${authState.currentUser.uid}`}>
                <div className="flex items-center justify-between border-slate-200 px-2 py-3 font-medium transition hover:bg-neutral-200 dark:border-slate-600 dark:hover:bg-slate-700">
                  {authState.userData?.name}
                  <svg
                    className="h-8 w-8 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </Link>
              <hr className="border-t border-slate-200 dark:border-slate-600" />
              <form onSubmit={() => SignOut()}>
                <button
                  type="Submit"
                  className="w-full px-2 py-3 text-left transition hover:bg-neutral-200 dark:hover:bg-slate-700"
                >
                  Sign out from account {authState.userData.name}
                </button>
              </form>
            </motion.section>
          )}
        </AnimatePresence>
        <section
          onClick={() => toggleIsOpenFooter((isOpen) => !isOpen)}
          className="m-2 flex items-center rounded-lg p-2 text-slate-800 hover:bg-slate-700/30 dark:text-slate-100"
        >
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full object-cover md:h-12 md:w-12"
              src={authState.userData?.profilePicture}
              alt="profile avatar"
            />
            <p className="ml-3 hidden pr-4 md:block">
              {authState.userData?.name}
            </p>
          </div>
        </section>
      </footer>
    </div>
  </nav>
);
};

export default Nav;
