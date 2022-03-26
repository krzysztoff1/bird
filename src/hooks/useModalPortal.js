import { useState, useEffect } from "react";

export const useModalPortal = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = "modal";
    div.style = "position: fixed; top: 0px; left: 0px; z-index: 1000";
    document.getElementsByTagName("body")[0].prepend(div);
    document.body.style.overflow = "hidden";
    setLoaded(true);

    return () => document.getElementsByTagName("body")[0].removeChild(div);
  }, []);

  return { loaded };
};
