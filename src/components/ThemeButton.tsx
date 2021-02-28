import React, { FC, useState } from "react";
import { IconButton, PaletteType, Tooltip } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

interface ThemeButtonProps {
  setTheme: (theme: PaletteType) => void;
  theme: PaletteType;
}

const ThemeButton: FC<ThemeButtonProps> = ({ setTheme, theme }) => {
  const classes = useStyles();

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Tooltip title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <IconButton color="inherit" aria-label="back" onClick={toggleTheme}>
        {theme === "dark" ? <BrightnessHighIcon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeButton;
