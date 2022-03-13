import { getDatabase, ref, set } from "firebase/database";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Messages = () => {
  const db = getDatabase();
  const authState = useContext(AuthContext);

  function writeUserData() {
    set(ref(db, "messages/" + "userone" + "/" + "usertwo/" + "m0/"), {
      name: "name",
      text: "text",
      timestamp: serverTimestamp(),
    });
  }
  writeUserData();
  return <div>Messages</div>;
};

export default Messages;
