import { useRef, useContext, useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { ModalPortal } from "../modals/ModalPortal";

const Nav = () => {
  const modalRef = useRef();
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const [notifications, setNotifications] = useState(false);
  const [isOpenFooter, toggleIsOpenFooter] = useState(false);
  const [settings, toggleSettings] = useState(false);

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
            <div className="absolute h-3 w-3 -translate-y-2 rounded-full border-2 border-white bg-green-400 dark:border-slate-900"></div>
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
  ];

  const menuItems = [
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
    {
      name: t("about"),
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      url: "/",
    },
  ];

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
    },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <>
      <ModalPortal ref={modalRef} />
      <nav className="z-50 w-fit overflow-visible border-r-[1px] border-slate-100 dark:border-slate-800">
        <div className="sticky top-0 z-50 mx-0 flex h-screen flex-col items-center justify-between sm:items-start">
          <header
            className={`${
              !settings && "overflow-hidden"
            } z-10 flex w-full flex-col items-center justify-around gap-3 overflow-hidden  px-0 py-3 backdrop-blur-xl md:items-start md:px-4`}
          >
            <NavLink className="mb-6 w-fit p-2" to="/">
              <div className="h-6 w-6">
                <svg
                  fill="#10b981"
                  width="100%"
                  height="100%"
                  viewBox="0 0 700 700"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlSpace="preserve"
                >
                  <g transform="matrix(1.01156,0,0,1.01155,-9.10405,-7.07441)">
                    <g>
                      <g transform="matrix(1.54461,0,0,1.54461,-185.613,-79.489)">
                        <path d="M266,368.66C266,320.574 285.797,277.043 317.625,245.71C300.473,237.835 281.461,233.335 261.332,233.335C186.594,233.335 126.002,293.925 126.002,368.665C126.002,443.407 186.596,504.005 261.342,504.005C281.467,504.005 300.475,499.501 317.635,491.63C285.803,460.29 266.006,416.763 266.006,368.67L266,368.66Z" />
                      </g>
                      <g transform="matrix(1.54461,0,0,1.54461,-185.613,-79.489)">
                        <path d="M438.66,364C390.574,364 347.043,344.203 315.71,312.355C307.835,329.523 303.335,348.535 303.335,368.664C303.335,443.406 363.925,504.004 438.665,504.004C513.407,504.004 574.005,443.41 574.005,368.664C574.005,348.539 569.501,329.531 561.63,312.355C530.29,344.203 486.763,364 438.67,364L438.66,364Z" />
                      </g>
                      <g transform="matrix(1.54461,0,0,1.54461,-185.613,-79.489)">
                        <path d="M438.66,56C418.535,56 399.527,60.504 382.351,68.375C414.199,99.715 433.996,143.242 433.996,191.335C433.996,239.421 414.199,282.952 382.351,314.285C399.519,322.16 418.531,326.66 438.66,326.66C513.402,326.66 574,266.07 574,191.33C574,116.588 513.406,55.99 438.66,55.99L438.66,56Z" />
                      </g>
                      <g transform="matrix(1.54461,0,0,1.54461,-185.613,-79.489)">
                        <path d="M261.34,196C309.426,196 352.957,215.797 384.29,247.625C392.165,230.473 396.665,211.461 396.665,191.332C396.665,116.594 336.075,56.002 261.335,56.002C186.593,56.002 125.995,116.596 125.995,191.342C125.995,211.467 130.499,230.475 138.37,247.635C169.71,215.803 213.237,196.006 261.33,196.006L261.34,196Z" />
                      </g>
                      <g id="q"></g>
                    </g>
                  </g>
                </svg>
              </div>
            </NavLink>
            {items.map((item) => (
              <NavLink
                key={item.name}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#34d399" : "",
                    fontWeight: isActive ? "600" : "400",
                  };
                }}
                className="flex items-center rounded-lg p-2 text-black transition-all hover:bg-slate-300/20 dark:text-white md:pr-4"
                to={item.url}
              >
                {item.icon}
                <p className="ml-3 hidden md:block">{item.name}</p>
              </NavLink>
            ))}
            <div>
              <button
                onClick={() => toggleSettings((state) => !state)}
                className="flex items-center rounded-lg p-2 text-slate-800 outline-none transition-all hover:bg-slate-300/20 dark:text-slate-100 md:pr-4"
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
              <AnimatePresence animateBeforeExit>
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
                            fontWeight: isActive ? "600" : "400",
                          };
                        }}
                        className="flex items-center rounded-lg p-2 text-black outline-none transition-all hover:bg-slate-300/20 dark:text-white md:pr-4"
                        to={item.url}
                      >
                        {item.icon}
                        <p className="ml-3 hidden md:block">{item.name}</p>
                      </NavLink>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => modalRef.current.toggleModal()}
              className="m-2 flex h-[44px] w-[44px] scale-110 items-center justify-center rounded-full bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 dark:text-slate-100 sm:h-fit md:w-fit md:px-4"
              to="/"
            >
              <svg
                className="h-6 w-6 text-white md:hidden"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              <p className="hidden text-center md:block">Post</p>
            </button>
          </header>
          <footer className="relative z-50">
            <AnimatePresence>
              {isOpenFooter && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute -top-44 z-50 ml-2 w-64 rounded-md border border-slate-200 bg-white text-black shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                  <Link
                    onClick={(e) => {
                      toggleIsOpenFooter(false);
                    }}
                    to={`/profile/${authState.currentUser.uid}`}
                  >
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
                  {/* </button> */}
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
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-8 flex-shrink-0 rounded-full object-cover md:h-12 md:w-12"
                  src={authState.userData?.profilePicture}
                  alt="profile avatar"
                />
                <p className="ml-3 hidden truncate pr-4 md:block">
                  {authState.userData?.name}
                </p>
              </div>
            </section>
          </footer>
        </div>
      </nav>
    </>
  );
};

export default Nav;
