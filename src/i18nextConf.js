import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translations: require("./assets/locales/en/translation.json"),
  },
  pl: {
    translations: require("./assets/locales/pl/translation.json"),
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  ns: ["translations"],
  defaultNS: "translations",
});

export default i18n;
