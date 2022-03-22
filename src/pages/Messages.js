import { getDatabase, ref, set } from "firebase/database";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Messages = () => {
  return <div className="text-white">Messages</div>;
};

export default Messages;
