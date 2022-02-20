import { db, auth, provider, storage } from "../lib/firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  query,
  getDoc,
  orderBy,
  limit,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { Result } from "postcss";

export async function getCurrentUser() {
  const user = auth.currentUser;
  return user;
}

export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      console.log(error.code + error.message);
    });
}

export function SignOut() {
  auth.signOut();
}

export async function uploadPost(text) {
  const user = await getCurrentUser();
  addDoc(collection(db, "posts"), {
    account: user.displayName,
    uid: user.uid,
    text: text,
    timestamp: serverTimestamp(),
    likedByUsers: [],
  });
}

export async function uploadPostWithImage({ text, file }) {
  let progress = "";
  const user = await getCurrentUser();
  const storageRef = ref(
    storage,
    `postImages/full${Math.floor(Math.random() * 1000)}.jpg`
  );
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        try {
          addDoc(collection(db, "posts"), {
            account: user.displayName,
            uid: user.uid,
            text: text,
            timestamp: serverTimestamp(),
            likedByUsers: [],
            imageUrl: downloadURL,
          });
          console.log("Added post with image");
        } catch (error) {
          console.error("Error adding post: ", error);
        }
      });
    }
  );
  return progress;
}

export async function getPosts() {
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(postsRef);
  return postsSnapshot.docs.map((doc) => doc.data());
}

export async function getUsers() {
  const usersRef = collection(db, "users");
  const userSnap = await getDocs(usersRef);
  return userSnap.docs.map((user) => user.data());
}

export async function isPostLikedByUser(id) {
  const user = await getCurrentUser();
  const postRef = doc(db, "posts", id);
  const docSnap = await getDoc(postRef);

  return docSnap.data().likedByUsers.includes(user.uid);
}

export async function getUserByUid(uid) {
  const postRef = doc(db, "users", uid);
  const docSnap = await getDoc(postRef);

  return docSnap.data();
}

export async function likePost({ id }) {
  const user = await getCurrentUser();
  const postRef = doc(db, "posts", id);
  const docSnap = await getDoc(postRef);

  if (docSnap.data().likedByUsers.includes(user.uid)) {
    updateDoc(postRef, {
      likedByUsers: arrayRemove(user.uid),
    });
    return;
  }
  updateDoc(postRef, {
    likedByUsers: arrayUnion(user.uid),
  });
}

export async function getFollowed() {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(postRef);
  return docSnap.data().following;
}

export async function isFollowed(uid) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(postRef);
  return docSnap.data().following.includes(uid);
}

export async function follow(uid) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  updateDoc(postRef, {
    following: arrayUnion(uid),
  });
}

export async function unFollow(uid) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  updateDoc(postRef, {
    following: arrayRemove(uid),
  });
}
