import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: '',
                data: [600000, 300000, 100000, 90000],
                backgroundColor: ["#40DFCD", "#417DFC", "#FFAA01", "#F2CB00"],
              }, 
        ]
    })
    setChartOptions({
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            }
        },
        maintainAspectRatio: false,
        responsive: true
    })
  }, [])

  return (
        <Bar data={chartData} options={chartOptions} />
  );
};

export default BarChart;