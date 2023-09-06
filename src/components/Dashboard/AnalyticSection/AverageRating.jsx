import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import { getAllReviews } from '../../../redux/action'; 

const RatingChart = () => {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allReviews);

  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Ratings',
        },
      },
    },
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  useEffect(() => {
    const ratings = allReviews.map((review) => review.rating);
    const ratingCounts = Array.from({ length: 5 }, (_, i) => ratings.filter((rating) => rating === i + 1).length).reverse();

    setChartData((prevChartData) => ({
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: [5, 4, 3, 2, 1],
        },
        colors: ['#8cb799', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
      },
      series: [
        {
          data: ratingCounts,
        },
      ],
    }));
  }, [allReviews]);

  return (
    <>
        <h2>Reviews Ratings</h2>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </>
  );
};

export default RatingChart;