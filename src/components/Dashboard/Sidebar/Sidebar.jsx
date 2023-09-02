import React, { useState } from "react";
import style from "./Sidebar.module.css";
import image from "../../../assets/index";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
  UilBars
} from "@iconscout/react-unicons";

export const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  return (
    <>
       <div className={style.bars} style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className={style.sidebar}
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      
      <div className={style.logo}>
        <span>GreenLand</span>
      </div>
      
      <div className={style.menu}>
        <NavLink
          to="/dashboard"
          className={`${style.menuItem} ${selected === 0 ? style.active : ""}`}
          onClick={() => setSelected(0)}
        >
          <UilEstate />
          <span className={style.noUnderline}>Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className={`${style.menuItem} ${selected === 1 ? style.active : ""}`}
          onClick={() => setSelected(1)}
        >
          <UilClipboardAlt />
          <span className={style.noUnderline}>Orders</span>
        </NavLink>
        <NavLink
          to="/dashboard/customers"
          className={`${style.menuItem} ${selected === 2 ? style.active : ""}`}
          onClick={() => setSelected(2)}
        >
          <UilUsersAlt />
          <span className={style.noUnderline}>Customers</span>
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={`${style.menuItem} ${selected === 3 ? style.active : ""}`}
          onClick={() => setSelected(3)}
        >
          <UilPackage />
          <span className={style.noUnderline}>Products</span>
        </NavLink>
        <NavLink
          to="/dashboard/analytics"
          className={`${style.menuItem} ${selected === 4 ? style.active : ""}`}
          onClick={() => setSelected(4)}
        >
          <UilChart />
          <span className={style.noUnderline}>Analytics</span>
        </NavLink>
        
          <NavLink to={"/home"} className={style.menuItem}>
            <UilSignOutAlt />
          </NavLink>
        
      </div>
      </motion.div>
    </>
  );
};

//<img className={style.logo_greenland} src={image.logo_greenland} alt="logo" />
