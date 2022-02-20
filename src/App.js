import "./index.css";
import SignIn from "./pages/SignIn";
import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { SignOut } from "./services/firebase";
import { auth } from "./lib/firebase";
import { getCurrentUser } from "./services/firebase";
import { Link } from "react-router-dom";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Router } from "react-router-dom";
import { Navigate } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/auth-context";
import { AuthContext } from "./context/auth-context";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Profile from "./pages/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState();
  getCurrentUser().then((res) => setUser(res));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, [currentUser]);

  if (user) {
    getDoc(doc(db, "users", user.uid)).then((docSnap) => {
      if (docSnap.exists()) return;
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        uid: user.uid,
        email: user.email,
        googleProfilePicture: user.photoURL,
        darkTheme: true,
        following: [user.uid],
      });
      console.log("Added User");
    });
  }

  if (pending) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {currentUser ? (
        <>
          <Link to="/">Home</Link>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </BrowserRouter>
  );
}

export default App;
