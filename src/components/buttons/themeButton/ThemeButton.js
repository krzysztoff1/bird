import { useState } from "react";
import "./index.css";
const ThemeButton = () => {
  const [dark, setDark] = useState(!!localStorage.theme);

  const toggleTheme = () => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      setDark(false);
      localStorage.setItem("theme", "");
      return;
    }
    document.documentElement.classList.add("dark");
    setDark(true);
    localStorage.setItem("theme", "dark");
  };

  return (
    <input
      onClick={() => toggleTheme()}
      id="toggle"
      className="toggle"
      type="checkbox"
      checked={dark}
    />
  );
};

export default ThemeButton;
