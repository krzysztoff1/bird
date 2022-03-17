import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "../../context/auth-context";
import { motion } from "framer-motion";

const Nav = () => {
  const authState = useContext(AuthContext);

  const [notifications, setNotifications] = useState(false);
  const [settings, toggleSettings] = useState();

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
      name: "Activity",
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
          fill="currentColor"
          viewBox="0 0 20 20"
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

  return (
    <nav className="border-r-[1px] border-slate-200 dark:border-slate-800">
      <div className="sticky top-0 mx-0 flex h-screen flex-col items-center justify-between sm:items-start md:mx-6">
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
              className="flex items-center rounded-full p-2 text-slate-800 transition-all hover:bg-emerald-500/30 dark:text-slate-100 md:pr-4"
              to={item.url}
            >
              {item.icon}
              <p className="ml-3 hidden md:block">{item.name}</p>
            </NavLink>
          ))}
          <div>
            <button
              onClick={() => toggleSettings(!settings)}
              className="flex items-center rounded-full p-2 text-slate-800 transition-all hover:bg-emerald-500/30 dark:text-slate-100 md:pr-4"
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
              <p className="ml-3 hidden text-xl md:block">Więcej</p>
            </button>
            <motion.div layout className={`${!settings && "hidden"} absolute md:block list-none`}>
              <ul className="w-full py-1">
                {menuItems.map((item, i) => (
                  <NavLink
                    key={item.name}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#34d399" : "",
                      };
                    }}
                    className="flex items-center rounded-full p-2 text-slate-800 transition-all hover:bg-emerald-500/30 dark:text-slate-100 md:pr-4"
                    to={item.url}
                  >
                    <p className="ml-3 hidden md:block">{item.name}</p>
                  </NavLink>
                ))}
              </ul>
            </motion.div>
          </div>
          <NavLink
            className="m-2 flex scale-110 items-center justify-center rounded-full bg-emerald-500 p-2 transition-all hover:bg-emerald-600 dark:text-slate-100 sm:px-4"
            to="/compose/post"
          >
            <svg
              className="h-6 w-6 md:hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <p className="hidden text-center md:block">Tweetnij</p>
          </NavLink>
        </header>
        <footer>
          <NavLink
            className="m-2 flex items-center rounded-full p-2  text-slate-800 hover:bg-teal-200/20 dark:text-slate-100 sm:hover:text-teal-500"
            to="/user/profile"
          >
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover md:h-12 md:w-12"
                src={authState.userData?.profilePicture}
                alt=" "
              />
              <p className="ml-3 hidden md:block">{authState.userData?.name}</p>
            </div>
            <svg
              className="ml-4 hidden h-6 w-6 md:block"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </NavLink>
        </footer>
      </div>
    </nav>
  );
};

export default Nav;
