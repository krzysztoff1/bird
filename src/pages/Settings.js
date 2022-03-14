import { useState, useEffect } from "react";
import ThemeButton from "../components/buttons/themeButton/ThemeButton";
import Header from "../components/header/Header";

const Settings = () => {
  const [dark, toggleDark] = useState(!!localStorage.theme);

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
      </section>
    </div>
  );
};

export default Settings;
