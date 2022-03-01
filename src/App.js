import "./index.css";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import NewPost from "./components/forms/NewPost";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Activity from "./pages/Activity";
import { useState, useEffect, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./lib/firebase";
import { getCurrentUser } from "./services/firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import MobileNav from "./components/nav/MobileNav";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
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

  useEffect(() => {
    if (!user) return;
    setLang();
  }, [user]);

  async function setLang() {
    const postRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(postRef);
    i18n.changeLanguage(docSnap.data().lang);
  }

  if (user) {
    getDoc(doc(db, "users", user.uid)).then((docSnap) => {
      if (docSnap.exists())
        return updateDoc(doc(db, "users", user.uid), {
          lang: navigator.language.substring(0, 2),
        });
      setDoc(doc(db, "users", user.uid), {
        lang: navigator.language.substring(0, 2),
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
          <MobileNav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile/:uid" element={<Profile />} />
            <Route path="/user/profile" element={<Settings />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/compose/post" element={<NewPost />} />
          </Routes>
        </>
      ) : (
        <SignIn />
      )}
    </BrowserRouter>
  );
}

export default App;
