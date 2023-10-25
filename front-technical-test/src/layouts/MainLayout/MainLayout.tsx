// src/layouts/MainLayout.tsx
import React from "react";
import "./MainLayout.scss";
import Header from "../../components/Header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout-header">
        <Header userName="cristian" />
      </div>
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default MainLayout;
