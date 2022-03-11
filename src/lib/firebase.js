// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
  import { getPerformance } from "firebase/performance";
  import { getAnalytics, logEvent } from "firebase/analytics";
  import {
    getFirestore,
    CACHE_SIZE_UNLIMITED,
    enableIndexedDbPersistence,
  } from "firebase/firestore";
  import { GoogleAuthProvider, getAuth } from "firebase/auth";
  import { getStorage } from "firebase/storage";

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: "socialmediaapp-758f7.appspot.com",
    messagingSenderId: "629836977165",
    appId: "1:629836977165:web:bc8c51e89bd6a19f8a7144",
    measurementId: "G-D1LZZ9YRDH",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const analytics = getAnalytics();
  const perf = getPerformance(app);

export { db, storage, provider, auth, app };
