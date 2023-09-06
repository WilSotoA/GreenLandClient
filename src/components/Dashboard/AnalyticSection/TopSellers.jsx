import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import { getAllOrders } from '../../../redux/action';


const TopSellers = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authData);

    const [chartData, setChartData] = useState({
      series: [],
      options: {
        chart: {
          width: 600,
          type: 'pie',
        },
        responsive: [
          {
            breakpoint: 280,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    });

    useEffect(() => {
        dispatch(getAllOrders(auth?.id));
      }, [dispatch, auth?.id]);


    useEffect(() => {
      const productQuantities = {};
      if (auth?.allOrders?.length > 0) {
      auth.allOrders.forEach((order) => {
        order.detail.forEach((detail) => {
          const { product, quantity } = detail;
          const { name } = product;
  
          if (productQuantities[name]) {
            productQuantities[name] += quantity;
          } else {
            productQuantities[name] = quantity;
          }
        });
      });
  
      const labels = Object.keys(productQuantities);
      const series = Object.values(productQuantities);
  
      setChartData((prevChartData) => ({
        options: {
          ...prevChartData.options,
          labels,
        },
        series,
      }));
    }}, [auth?.allOrders]);
  
    return (
      <div>
        <h2>Top Sellers</h2>
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={chartData.options.chart.width}
        />
      </div>
    );
  };
  
  export default TopSellers;