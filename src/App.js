import "./index.css";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import SignIn from "./pages/SignIn";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./lib/firebase";
import { getCurrentUser } from "./services/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";

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
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/post/:id" element={<SinglePost />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </BrowserRouter>
  );
}

export default App;
