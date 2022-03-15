import { useState, useEffect } from "react";
import { getFollowed } from "../services/firebase";

export default function useFeed() {
  const [users, setUsers] = useState(null);
  const [pending, togglePending] = useState(true);

  useEffect(() => {
    getFollowedAccounts();
  }, []);

  const getFollowedAccounts = async () => {
    const followingRes = await getFollowed();
    setUsers(followingRes);
    togglePending(false);
  };

  return { users, pending };
}
