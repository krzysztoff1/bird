import Loading from "../pages/Loading";
import { db } from "../lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { getUserByUid } from "../services/firebase";
import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import AppLogo from "../components/loaders/AppLogo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [pending, setPending] = useState(true);
  const [refresher, toggleRefresher] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });

    getUserData();
  }, [currentUser, refresher]);

  const getUserData = async () => {
    if (!currentUser) return;
    onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setUserData(doc.data());
    });
  };

  if (pending) {
    return <AppLogo />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        pending,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
