import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend";

const resources = {
  en: {
    translations: require("./assets/locales/en/translation.json"),
  },
  pl: {
    translations: require("./assets/locales/pl/translation.json"),
  },
};

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    ns: ["translations"],
    defaultNS: "translations",
  });

export default i18n;
