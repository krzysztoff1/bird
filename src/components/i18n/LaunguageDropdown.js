import { Trans, useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { changeLanguage } from "i18next";

const LaunguageDropdown = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("pl");

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel>{t("language")}</InputLabel>
        <Select
          value={lang}
          label="Age"
          onChange={(e) => {
            setLang(e.target.value);
            i18n.changeLanguage(e.target.value);
          }}
        >
          <MenuItem value={"pl"}>polish</MenuItem>
          <MenuItem value={"en"}>english</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LaunguageDropdown;
