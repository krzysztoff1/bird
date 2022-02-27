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

const Nav = () => {
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState(false);

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

  return (
    <nav className="fixed bottom-0 z-50 flex w-[100vw] justify-around overflow-y-auto bg-slate-200/60 px-3 py-3 backdrop-blur-xl dark:bg-slate-900/30">
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#34d399" : "",
          };
        }}
        className="rounded-full p-2  text-slate-800 dark:text-slate-100 sm:hover:bg-teal-200 sm:hover:text-teal-500"
        to="/"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#34d399" : "",
          };
        }}
        className="relative rounded-full p-2  text-slate-800 dark:text-slate-100 sm:hover:bg-teal-200 sm:hover:text-teal-500"
        to="/activity"
      >
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
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            color: isActive ? "#34d399" : "",
          };
        }}
        className="rounded-full p-2  text-slate-800 dark:text-slate-100 sm:hover:bg-teal-200 sm:hover:text-teal-500"
        to="/user/profile"
      >
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
          ></path>
        </svg>
      </NavLink>
    </nav>
  );
};

export default Nav;
