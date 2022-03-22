import { db } from "../lib/firebase";
import useFollowing from "./useFollowing";
import { useState, useEffect, useReducer, useContext } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";

const reducer = (state, action) => {
  switch (action.type) {
    case "idle":
      return { status: "idle", data: undefined, error: undefined };
    case "loading":
      return { status: "loading", data: undefined, error: undefined };
    case "success":
      return { status: "success", data: action.payload, error: undefined };
    case "error":
      return { status: "error", data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

export default function useFeed() {
  const [numberOfPosts, setNumberOfPosts] = useState(20);
  const { users, pending } = useFollowing();

  const initialState = {
    status: "idle",
    data: undefined,
    error: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (pending) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("comment", "==", false),
        where("uid", "in", users),
        limit(numberOfPosts),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        dispatch({
          type: "success",
          payload: snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        });
      },
      (error) => {
        dispatch({
          type: "error",
          error: error,
        });
      }
    );
    return () => unsubscribe();
  }, [users, pending, numberOfPosts]);

  const fetchMoreData = () => {
    setNumberOfPosts((n) => n + 10);
  };

  return { state, fetchMoreData };
}
