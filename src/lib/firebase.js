// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKprVhAz0z2MDIpzky-15LHhmbSPb8xaE",
  authDomain: "socialmediaapp-758f7.firebaseapp.com",
  projectId: "socialmediaapp-758f7",
  storageBucket: "socialmediaapp-758f7.appspot.com",
  messagingSenderId: "629836977165",
  appId: "1:62983697s7165:web:bc8c51e89bd6a19f8a7144",
  measurementId: "G-D1LZZ9YRDH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { db, storage, provider, auth, app };
