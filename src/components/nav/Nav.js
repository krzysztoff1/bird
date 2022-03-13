import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaKiwiBird } from "react-icons/fa";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const Nav = () => {
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
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
      ),
    },
    {
      name: "Profile",
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
    <nav className="min-h-screen border-r-[1px] border-slate-800 bg-slate-900">
      <div className="sticky top-0 left-0 z-50 flex flex-col justify-around gap-3 overflow-y-auto bg-slate-200/60 px-3 py-3 backdrop-blur-xl dark:bg-slate-900/30">
        {items.map((link) => (
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#34d399" : "",
              };
            }}
            className="flex items-center rounded-full p-2  text-slate-800 hover:bg-teal-200/20 dark:text-slate-100 sm:hover:text-teal-500"
            to={link.url}
          >
            {link.icon}
            <p className="ml-3">{link.name}</p>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
