import { useState } from "react";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const LaunguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("pl");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return <></>;
};

export default LaunguageDropdown;
