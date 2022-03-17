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
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
