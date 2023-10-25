import React, { createContext, useState, useContext, ReactNode } from "react";

interface RouteContextProps {
  currentRoute: string;
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

interface RouteProviderProps {
  children: ReactNode;
}

export const RouteProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("upload");

  return (
    <RouteContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRouteContext = (): RouteContextProps => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider");
  }
  return context;
};
