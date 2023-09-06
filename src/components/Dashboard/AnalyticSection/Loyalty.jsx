import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import { getAllOrders } from '../../../redux/action'; 

const LoyaltyChart = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authData);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Number of Purchases',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  useEffect(() => {
    dispatch(getAllOrders(auth?.id));
  }, [dispatch, auth?.id]);

  useEffect(() => {
    const customerPurchases = {};
    if (auth?.allOrders?.length > 0) {
    auth.allOrders.forEach((order) => {
      const { user } = order.orden;
      const { name } = user;

      if (customerPurchases[name]) {
        customerPurchases[name] += 1;
      } else {
        customerPurchases[name] = 1;
      }
    });

    const customerNames = Object.keys(customerPurchases);
    const purchaseCounts = Object.values(customerPurchases);

    setChartData((prevChartData) => ({
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: customerNames,
        },
        colors: ['#8cb799', '#d0e1d6', '#e6efe9'],
      },
      series: [
        {
          name: 'Number of orders',
          data: purchaseCounts,
        },
      ],
    }));
}}, [auth?.allOrders]);

  return (
    <>
      <h2>Loyalty</h2>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </>
  );
};

export default LoyaltyChart