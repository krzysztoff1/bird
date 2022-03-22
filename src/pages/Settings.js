import i18n from "../i18nextConf";
import ThemeButton from "../components/buttons/themeButton/ThemeButton";
import Header from "../components/header/Header";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Settings = () => {
  const { t } = useTranslation();
  const [lngDropdown, togglelngDropdown] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //TODO save lang pref to firestore
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  const languages = [
    {
      title: "Polish",
      short: "pl",
    },
    {
      title: "English",
      short: "en",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header text="Settings" />
      <section className="mx-auto mt-8 flex max-w-md flex-col gap-4 px-4 py-2">
        <div className="flex items-center justify-between">
          <h5 className="text-white">{t("theme")}</h5>
          <ThemeButton />
        </div>
        <div className="flex items-center justify-between">
          <h5 className="text-white">{t("language")}</h5>
          <div className="relative">
            <button
              onClick={() => togglelngDropdown((state) => !state)}
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              {t("change_language")}{" "}
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`${
                !lngDropdown && "hidden"
              } absolute top-12 left-0 z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700`}
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                {languages.map((lang) => (
                  <li key={lang.short}>
                    <button
                      onClick={() => changeLanguage(lang.short)}
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {lang.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
