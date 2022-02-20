import { db, auth, provider } from "../lib/firebase";
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

export async function uploadPost({ text }) {
  const user = await getCurrentUser();
  addDoc(collection(db, "posts"), {
    account: user.displayName,
    uid: user.uid,
    text: text,
    timestamp: serverTimestamp(),
    likedByUsers: [],
  });
}

export async function getPosts() {
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(postsRef);
  const posts = postsSnapshot.docs.map((doc) => doc.data());
  return posts;
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
