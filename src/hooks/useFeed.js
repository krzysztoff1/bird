import { useState } from "react";

function useFeed() {
  const [posts, setPosts] = useState(null);
  const [pending, togglePending] = useState(true);

  return posts;
}
