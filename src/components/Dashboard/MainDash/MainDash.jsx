import React from "react";
import style from "./MainDash.module.css";
import { RecentOrders } from "../Table/Table";
import { Cards } from "../Card/Card";
import { RightSide } from "../RightSide/RightSide";

export const MainDash = () => {
  return (
    <div className={style.MainDash}>
      <div className={style.mainDashCompMiddle}>
        <h1>Dashboard</h1>
        <Cards />
        <RecentOrders />
      </div>
      <div className={style.mainDashCompRight}>
        <RightSide />
      </div>
    </div>
  );
};
