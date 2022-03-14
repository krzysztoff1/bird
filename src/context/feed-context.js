import Loading from "../pages/Loading";
import { db, auth } from "../lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { getUserByUid } from "../services/firebase";
import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AppLogo from "../components/loaders/AppLogo";

export const FeedContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(false);
  }, []);

  if (pending) {
    return <AppLogo />;
  }

  return <FeedContext.Provider value={{}}>{children}</FeedContext.Provider>;
};
