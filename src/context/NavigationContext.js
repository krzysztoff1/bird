import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [position, setPosition] = useState("home");
  const [text, setText] = useState("");

  // 0: home
  // 1: activity
  // 2: settings
  // 3: singlePost
  // 4: profile

  return (
    <NavigationContext.Provider
      value={{
        position,
        setPosition,
        text,
        setText,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
