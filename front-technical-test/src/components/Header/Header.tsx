import React from "react";
import "./Header.scss";
import Switch from "@mui/material/Switch";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const { darkMode, setDarkMode } = useTheme();

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="header">
      <Box height={"100%"}>
        <Grid height={"100%"} container spacing={0}>
          <Grid className="item-grid" item xs={2} md={2}>
            <div className="logo alc al-c">
              <img src="/src/assets/Vector.svg" alt="My Logo" />
            </div>
          </Grid>
          <Grid className="item-grid" item xs={5} md={2}>
            <div className="theme-switcher alc al-c">
              <label className="label-switch">
                Modo oscuro
                <Switch checked={darkMode} onChange={handleThemeToggle} />
              </label>
            </div>
          </Grid>
          <Grid className="item-grid" item md={8} xs={5}>
            <div className="container-drop alc al-r">
              <button className="user-button alc al-c">
                Hola, {userName} <ArrowDropDown />
              </button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
};

export default Header;
