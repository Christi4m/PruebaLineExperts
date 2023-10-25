import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Routes";
import "./App.scss";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { RouteProvider } from "./contexts/RoutesContext";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <WrappedComponent />
      </ThemeProvider>
    </React.StrictMode>
  );
};

const WrappedComponent: React.FC = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
      <RouteProvider>
        <Routes />
      </RouteProvider>
    </Router>
  );
};

export default App;
