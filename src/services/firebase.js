import { db, auth, provider, storage } from "../lib/firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
  setDoc,
  getDoc,
  orderBy,
  limit,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createResizedImage, createResizedImage200 } from "./resizeImage";
import FastAverageColor from "fast-average-color";

// authentication
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

export async function signUpWithEmail({ email, password, name }) {
  console.log(name);
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      setDoc(doc(db, "users", user.uid), {
        lang: navigator.language.substring(0, 2),
        name: name,
        uid: user.uid,
        email: user.email,
        profilePicture:
          "https://img.redro.pl/plakaty/default-profile-picture-avatar-photo-placeholder-vector-illustration-400-205664584.jpg",
        darkTheme: true,
        following: [user.uid],
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function checkUserName(name) {
  const q = query(collection(db, "users"), where("name", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((user) => {
    return true;
  });
  return false;
}

export function SignOut() {
  auth.signOut();
}
// drafts
export async function saveWorkingCopy(text) {
  const user = await getCurrentUser();

  addDoc(collection(db, "drafts"), {
    uid: user.uid,
    text: text,
  });
}
// upload posts and comments
export async function uploadPost({ text, parentId, grandParentId }) {
  let id = Math.random() * 1000;

  const user = await getCurrentUser();
  const userData = await getUserByUid(user.uid);

  if (!parentId && !grandParentId) {
    addDoc(collection(db, "posts"), {
      comment: false,
      account: userData.name,
      uid: user.uid,
      text: text,
      timestamp: serverTimestamp(),
      likedByUsers: [],
    });
    return;
  }

  if (parentId && !grandParentId) {
    console.log(parentId);

    addDoc(collection(db, "posts"), {
      comment: true,
      parentId: parentId,
      account: userData.name,
      uid: user.uid,
      text: text,
      timestamp: serverTimestamp(),
      likedByUsers: [],
    });

    // send notification
    const parentPost = await getPostById(parentId);
    addDoc(collection(db, "notifications"), {
      timestamp: serverTimestamp(),
      typeOfNotification: "comment",
      read: false,
      uid: parentPost.uid,
      id: parentId,
      commentText: text,
      commentedByUid: user.uid,
      commentedByName: userData.name,
    });
    return;
  }

  addDoc(collection(db, "posts"), {
    comment: true,
    parentId: parentId.parentId,
    grandParentId: grandParentId.id,
    account: userData.name,
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
  let averageColor;
  let imageId = Math.floor(Math.random() * 1000);

  const fac = new FastAverageColor();

  const user = await getCurrentUser();
  const userData = await getUserByUid(user.uid);

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
        const setAverageColor = async () => {
          averageColor = await fac.getColorAsync(thumbnailUrl);
          uploadPost();
        };
        setAverageColor();
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
          account: userData.name,
          uid: user.uid,
          text: text,
          timestamp: serverTimestamp(),
          likedByUsers: [],
          averageColor: averageColor,
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
        account: userData.name,
        uid: user.uid,
        text: text,
        timestamp: serverTimestamp(),
        likedByUsers: [],
        averageColor: averageColor,
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
// get
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
// user profile / settings
export async function setUserDescription(text) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);

  updateDoc(postRef, {
    description: text,
  });
}

export async function setUserPhoto(file) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  let progress = "";

  deleteObject(ref(storage, `profilePictures/uid_${user.uid}.jpg`))
    .then(() => {
      console.log("previous photo deleted");
    })
    .catch((error) => {
      console.log("no photo to delete" + error);
    });

  const resizedProfileImage = await createResizedImage200(file);
  const storageRef = ref(storage, `profilePictures/uid_${user.uid}.jpg`);
  const uploadImage = uploadBytesResumable(storageRef, resizedProfileImage);
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
        updateDoc(postRef, {
          profilePicture: downloadURL,
        });
      });
    }
  );
}

// likes
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
  const userData = await getUserByUid(user.uid);

  const postRef = doc(db, "posts", id);
  const docSnap = await getDoc(doc(db, "posts", id));

  if (docSnap.data().likedByUsers.includes(user.uid))
    return updateDoc(postRef, { likedByUsers: arrayRemove(user.uid) });
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
    likedByName: userData.name,
  });
}
// notifications
export async function markReadNotification(id) {
  await deleteDoc(doc(db, "notifications", id));
}
// follow
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
  const userRef = doc(db, "users", user.uid);
  updateDoc(userRef, {
    following: arrayUnion(uid),
  });

  const followedRef = doc(db, "users", uid);
  updateDoc(followedRef, {
    followedBy: arrayUnion(user.uid),
  });
}

export async function unFollow(uid) {
  const user = await getCurrentUser();
  const postRef = doc(db, "users", user.uid);
  updateDoc(postRef, {
    following: arrayRemove(uid),
  });

  const unFollowedRef = doc(db, "users", uid);
  updateDoc(unFollowedRef, {
    followedBy: arrayRemove(user.uid),
  });
}
