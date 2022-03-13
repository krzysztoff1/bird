// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
  import { getPerformance } from "firebase/performance";
  import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {
    getFirestore,
    initializeFirestore,
    CACHE_SIZE_UNLIMITED,
    disableNetwork,
    enableIndexedDbPersistence,
  } from "firebase/firestore";
  import { GoogleAuthProvider, getAuth } from "firebase/auth";
  import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKprVhAz0z2MDIpzky-15LHhmbSPb8xaE",
  authDomain: "socialmediaapp-758f7.firebaseapp.com",
  databaseURL:
    "https://socialmediaapp-758f7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "socialmediaapp-758f7",
  storageBucket: "socialmediaapp-758f7.appspot.com",
  messagingSenderId: "629836977165",
  appId: "1:629836977165:web:bc8c51e89bd6a19f8a7144",
  measurementId: "G-D1LZZ9YRDH",
};

  const app = initializeApp(firebaseConfig);
  const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  });
  // const db = getFirestore(app);
  enableIndexedDbPersistence(db);
  const storage = getStorage(app);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const analytics = getAnalytics();
  const perf = getPerformance(app);
  const database = getDatabase(app);

  const disable = async () => {
    await disableNetwork(db);
    console.log("Network disabled!");
  };
  // disable();

export { db, storage, provider, auth, app };
