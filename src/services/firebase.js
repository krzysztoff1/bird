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
import { createResizedImage } from "./resizeImage";

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

export async function saveWorkingCopy(text) {
  const user = await getCurrentUser();

  addDoc(collection(db, "drafts"), {
    uid: user.uid,
    text: text,
  });
}

export async function uploadPost({ text, parentId, grandParentId }) {
  const user = await getCurrentUser();

  if (!parentId && !grandParentId) {
    addDoc(collection(db, "posts"), {
      comment: false,
      account: user.displayName,
      uid: user.uid,
      text: text,
      timestamp: serverTimestamp(),
      likedByUsers: [],
    });
    return;
  }

  if (parentId && !grandParentId) {
    addDoc(collection(db, "posts"), {
      comment: true,
      parentId: parentId.parentId,
      account: user.displayName,
      uid: user.uid,
      text: text,
      timestamp: serverTimestamp(),
      likedByUsers: [],
    });
    return;
  }

  addDoc(collection(db, "posts"), {
    comment: true,
    parentId: parentId.parentId,
    grandParentId: grandParentId.id,
    account: user.displayName,
    uid: user.uid,
    text: text,
    timestamp: serverTimestamp(),
    likedByUsers: [],
  });
}

export async function uploadPostWithImage({ text, file, id }) {
  let progress = "";
  let progressT = "";
  let fullImageUrl = "";
  let imageId = Math.floor(Math.random() * 1000);

  const user = await getCurrentUser();

  const storageRef = ref(storage, `postImages/full_${imageId}.jpg`);
  const uploadImage = uploadBytesResumable(storageRef, file);
  uploadImage.on(
    "state_changed",
    (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
        fullImageUrl = downloadURL;
        uploadPost();
      });
    }
  );

  const thumbnail = await createResizedImage(file);

  let thumbnailUrl = "";
  const storageRefThumbnail = ref(
    storage,
    `postImages/thumbnail_${imageId}.jpg`
  );
  const uploadThumbnail = uploadBytesResumable(storageRefThumbnail, thumbnail);
  uploadThumbnail.on(
    "state_changed",
    (snapshot) => {
      progressT = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progressT);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadThumbnail.snapshot.ref).then((downloadURL) => {
        thumbnailUrl = downloadURL;
      });
    }
  );

  function uploadPost() {
    if (!id) {
      try {
        addDoc(collection(db, "posts"), {
          comment: false,
          account: user.displayName,
          uid: user.uid,
          text: text,
          timestamp: serverTimestamp(),
          likedByUsers: [],
          imageUrl: fullImageUrl,
          thumbnailUrl: thumbnailUrl,
        });
        console.log("Added post with image");
        return;
      } catch (error) {
        console.error("Error adding post: ", error);
      }
    }
    try {
      addDoc(collection(db, "posts"), {
        comment: true,
        parentId: id.id,
        account: user.displayName,
        uid: user.uid,
        text: text,
        timestamp: serverTimestamp(),
        likedByUsers: [],
        imageUrl: fullImageUrl,
        thumbnailUrl: thumbnailUrl,
      });
      console.log("Added post with image");
      return;
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  }
  return progress;
}

export async function getPosts() {
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(postsRef);
  return postsSnapshot.docs.map((post) => post.data());
}

export async function getPostById(id) {
  const postRef = doc(db, "posts", id);
  const docSnap = await getDoc(postRef);

  return docSnap.data();
}

export async function getUsers() {
  const usersRef = collection(db, "users");
  const userSnap = await getDocs(usersRef);
  return userSnap.docs.map((user) => user.data());
}

export async function setUserDescription(text) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);

  updateDoc(postRef, {
    description: text,
  });
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

  addDoc(collection(db, "notifications"), {
    typeOfNotification: "like",
    read: false,
    timestamp: serverTimestamp(),
    uid: docSnap.data().uid,
    likedPost: id,
    likedBy: user.uid,
    likedByName: user.displayName,
  });
}

export async function markReadNotification(id) {
  const postRef = doc(db, "notifications", id);
  updateDoc(postRef, {
    read: true,
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
