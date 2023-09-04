import React, { useEffect, useState } from 'react';
import style from './Card.module.css';
import { UilTimes } from "@iconscout/react-unicons";
import { motion, AnimateSharedLayout } from 'framer-motion';
import Chart from "react-apexcharts";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getAllOrders } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  
  UilClipboardAlt,
  UilUsdSquare,
  UilMoneyWithdrawal
} from "@iconscout/react-unicons";

export const Cards = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);
  const [salesData, setSalesData] = useState([]);
  

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch]);
  

  useEffect(() => {
    if (auth?.allOrders?.length > 0) {
      const totalRevenue = auth.allOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const timeSeries = auth.allOrders.map((order) => ({
        x: new Date(order.orden.date).getTime(),
        y: order.orden.totalPrice,
      }));

      setSalesData([
        {
          title: "Sales",
          color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          barValue: ((totalRevenue / 1000) * 100).toFixed(2),
          value: totalRevenue.toFixed(2),
          png: UilUsdSquare,
          series: [
            {
              name: "Sales",
              data: timeSeries,
            },
          ],
        },
        {
          title: "Revenue",
          color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          },
          barValue: 80,
          value: "14,270",
          png: UilMoneyWithdrawal,
          series: [
            {
              name: "Revenue",
              data: [10, 100, 50, 70, 80, 30, 40],
            },
          ],
        },
        {
          title: "Expenses",
          color: {
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          },
          barValue: 60,
          value: "4,270",
          png: UilClipboardAlt,
          series: [
            {
              name: "Expenses",
              data: [10, 25, 15, 30, 12, 15, 20],
            },
          ],
        },
      ]); 
    }
  }, [auth?.allOrders]);








  return (
    <div className={style.Cards}>
      {salesData.map((card, id) => (
        <Card
          key={id}
          title={card.title}
          color={card.color}
          barValue={card.barValue}
          value={card.value}
          png={card.png}
          series={card.series}
        />
      ))}
    </div>
  );
};


export const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={toggleExpanded} />
      ) : (
        <CompactCard param={props} setExpanded={toggleExpanded} />
      )}
    </AnimateSharedLayout>
  );
};

function CompactCard({ param, setExpanded }) {
  // CompactCard
  const Png = param.png;
  return(
      <motion.div 
      className={style.CompactCard}
      style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId="expandableCard"
        onClick={setExpanded}
        >
          <div className={style.radialBar}>
              <CircularProgressbar
              className={style.CircularProgressbar} 
              value={param.barValue}
              trail={param}
              />
              <span>{param.title}</span>
          </div>
          <div className={style.detail}>
              <Png/>
              <span>${param.value}</span>
              <span>Last 24 hours</span>
          </div>
      </motion.div>
  )
}


function ExpandedCard({ param, setExpanded }) {
    const data = {
      options: {
        chart: {
          type: "area",
          height: "auto",
        },
  
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: "#000",
          opacity: 0.35,
        },
  
        fill: {
          colors: ["#fff"],
          type: "gradient",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["white"],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        grid: {
          show: true,
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
      },
    };
    return (
        <motion.div
          className={style.ExpandedCard}
          style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow,
          }}
          layoutId="expandableCard"
        >
          <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
            <UilTimes onClick={setExpanded} />
          </div>
            <span>{param.title}</span>
          <div className={style.chartContainer}>
            <Chart options={data.options} series={param.series} type="area" />
          </div>
          <span>Last 24 hours</span>
        </motion.div>
      );
}



/*
<CircularProgressbar
              className={style.CircularProgressbar} 
              value={param.barValue}
              text={`${param.barValue}%`}
              trail={param}
              />
*/