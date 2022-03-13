import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

export const NavigationContext = createContext();

// 0: home
// 1: activity
// 2: settings
// 3: singlePost
// 4: profile

export const NavigationProvider = ({ children }) => {
  const [pathName, setPathName] = useState(String);
  const [position, setPosition] = useState(String);
  let location = useLocation();
  useEffect(() => {
    setPathName(location.pathname);
    if (pathName === "/") setPosition("home");
    if (pathName === "/activity") setPosition("activity");
    if (pathName.includes("profile")) setPosition("profile");
    if (pathName === "/") setPosition("home");
  }, [location]);

  return (
    <NavigationContext.Provider
      value={{
        position,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
