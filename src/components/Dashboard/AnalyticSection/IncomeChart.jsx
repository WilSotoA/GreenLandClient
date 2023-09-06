import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../../redux/action';

function SalesChart() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: [''],
      },
      colors: ['#8cb799']
    },
    series: [
      {
        name: 'Incomes',
        data: [0],
      },
    ],
  });

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch, auth?.id]);

  useEffect(() => {
    if (auth?.allOrders?.length > 0) {
      const totalIncome = auth.allOrders.reduce((acc, order) => {
        const orderTotal = order.detail.reduce((total, item) => total + item.quantity * item.price, 0);
        return acc + orderTotal;
      }, 0);
      setChartData((prevChartData) => ({
        ...prevChartData,
        series: [
          {
            data: [totalIncome],
          },
        ],
      }));
    }
  }, [auth?.allOrders]);

  return (
    <div>
      <h2>Total Incomes</h2>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
}

export default SalesChart;