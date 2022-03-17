import { setUserName } from "../services/firebase";
import { useState, useEffect } from "react";
import ThemeButton from "../components/buttons/themeButton/ThemeButton";
import Header from "../components/header/Header";

const Settings = () => {
  const [dark, toggleDark] = useState(!!localStorage.theme);
  const [text, setText] = useState();
  console.log("====================================");
  console.log(text);
  console.log("====================================");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header text="Settings" />
      <section className="mx-auto mt-8 max-w-md px-4 py-2">
        <div className="flex items-center justify-between">
          <h4 className="text-white">Theme</h4>
          <ThemeButton />
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-white">Set userName</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUserName(text);
            }}
          >
            <input onChange={(e) => setText(e.target.value)} type="text" />
            <button type="submit">Change</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Settings;
