import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';


export const Landing = () => {
    return(
        <div className={style.landingPage}>
            <h1 className={style.header}>
            "The environment is not a resource to be destroyed, but a legacy that we must protect
            </h1>
            <h1 className={style.header}>
                 Join the cause and be an active part of the solution"</h1>
            <br />
            <Link className={`${style.btn} ${style.btnPrimary}`} to={"/home"}>
                JOIN US
            </Link>
            
        </div>
    )
}