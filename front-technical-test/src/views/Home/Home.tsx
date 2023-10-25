// src/views/Home/Home.tsx
import React from "react";

import "./Home.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import HorizontalLines from "../../components/HorizontalLines/HorizontalLines";
import HomeRoutes from "../../Routes/HomeRoutes";
import { useRouteContext } from "../../contexts/RoutesContext";

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentRoute } = useRouteContext();
  return (
    <MainLayout>
      <div className="home alc al-c">
        <div className="content-ip a al-r">
          <h6>Último ingreso 05/10/2023 - 08:05 am </h6>
          <h6>Dirección IP:186.145.19.35</h6>
        </div>

        <div className="tabs ">
          <h3 className="label">
            {currentRoute == "upload"
              ? "Cargue de facturas en dos pasos"
              : "Cargue de facturas"}
          </h3>
          <HorizontalLines currentRoute={currentRoute} />
          <div className="labelInfo">
            <h3>Carga la informacion de las facturas de tu empresa</h3>
          </div>
          <HomeRoutes />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
