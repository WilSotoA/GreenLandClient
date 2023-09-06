import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import { UilTimes } from "@iconscout/react-unicons";
import { motion, AnimateSharedLayout } from "framer-motion";
import Chart from "react-apexcharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getAllOrders } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { UilUsdSquare } from "@iconscout/react-unicons";

export const Cards = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch]);

  useEffect(() => {
    if (auth?.allOrders?.length > 0) {
      const sortedOrders = auth.allOrders.sort((a, b) => {
        return new Date(a.orden.date) - new Date(b.orden.date);
      });

      const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const recentOrders = sortedOrders.filter((order) => {
      return new Date(order.orden.date) >= twentyFourHoursAgo;
    });

      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      const recentFifteenDaysOrders = sortedOrders.filter((order) => {
        return new Date(order.orden.date) >= fifteenDaysAgo;
      });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentThirtyDaysOrders = sortedOrders.filter((order) => {
        return new Date(order.orden.date) >= thirtyDaysAgo;
      });

      const totalRevenue = sortedOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const recentRevenue = recentOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const fifteenDaysRevenue = recentFifteenDaysOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const thirtyDaysRevenue = recentThirtyDaysOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const timeSeries = recentOrders.map((order) => ({
        x: new Date(order.orden.date).getTime(),
        y: order.orden.totalPrice,
      }));

      const fifteenDaysTimeSeries = recentFifteenDaysOrders.map((order) => ({
        x: new Date(order.orden.date).getTime(),
        y: order.orden.totalPrice,
      }));

      const thirtyDaysTimeSeries = recentThirtyDaysOrders.map((order) => ({
        x: new Date(order.orden.date).getTime(),
        y: order.orden.totalPrice,
      }));

      const totalSales = sortedOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const recentSales = recentOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const fifteenDaysSales = recentFifteenDaysOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const thirtyDaysSales = recentThirtyDaysOrders.reduce(
        (total, order) => total + order.orden.totalPrice,
        0
      );

      const salesPercentage = (recentSales / totalSales) * 100;
      const fifteenDaysSalesPercentage = (fifteenDaysSales / totalSales) * 100;
      const thirtyDaysSalesPercentage = (thirtyDaysSales / totalSales) * 100;

      setSalesData([
        {
          title: "Sales (Last 24 Hours)",
          color: {
            backGround: "linear-gradient(180deg, #d0e1d6 0%, #8cb799 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          barValue: salesPercentage.toFixed(2),
          value: recentRevenue.toFixed(2),
          png: UilUsdSquare,
          series: [
            {
              name: "Sales",
              data: timeSeries,
            },
          ],
        },
        {
          title: "Sales (Last 15 Days)",
          color: {
            backGround: "linear-gradient(180deg, #d0e1d6 0%, #8cb799 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          barValue: fifteenDaysSalesPercentage.toFixed(2),
          value: fifteenDaysRevenue.toFixed(2),
          png: UilUsdSquare,
          series: [
            {
              name: "Sales",
              data: fifteenDaysTimeSeries,
            },
          ],
        },
        {
          title: "Sales (Last 30 Days)",
          color: {
            backGround: "linear-gradient(180deg, #d0e1d6 0%, #8cb799 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          },
          barValue: thirtyDaysSalesPercentage.toFixed(2),
          value: thirtyDaysRevenue.toFixed(2),
          png: UilUsdSquare,
          series: [
            {
              name: "Sales",
              data: thirtyDaysTimeSeries,
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
  const Png = param.png;

  return (
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
          text={`${param.barValue}%`}
          trail={param}
        />
        <span>{param.title}</span>
      </div>
      <div className={style.detail}>
        <Png />
        <span>${param.value}</span>
        <span>{param.timePeriod}</span>
      </div>
    </motion.div>
  );
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
        categories: [],
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
      <div
        style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}
      >
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className={style.chartContainer}>
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span>{param.timePeriod}</span>
    </motion.div>
  );
}