import { Trans, useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { changeLanguage } from "i18next";

const LaunguageDropdown = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  const handleChange = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(lang);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select value={lang} label="Age" onChange={handleChange}>
          <MenuItem value={"en"}>polish</MenuItem>
          <MenuItem value={"pl"}>english</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LaunguageDropdown;
