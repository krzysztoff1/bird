import { db, auth } from "../lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AppLogo from "../components/loaders/AppLogo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getUserData();
      setPending(false);
    });
    return () => unsub();
  }, [currentUser]);

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
