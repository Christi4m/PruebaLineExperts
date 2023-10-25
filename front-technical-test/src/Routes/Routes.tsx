// src/router/routes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home/Home";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/home/*" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default RoutesComponent;
