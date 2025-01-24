import {
  Title,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const randomNumberArray1 = Array.from({ length: 12 }, () => generateRandomNumber(10000, 200000))
const randomNumberArray2 = Array.from({ length: 12 }, () => generateRandomNumber(50000, 600000))

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: '',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: randomNumberArray1,
      borderColor: 'rgba(65, 125, 252, 1)',
      backgroundColor: 'rgba(65, 125, 252, 1)',
      yAxisID: 'y',
    },
    {
      label: '',
      data: randomNumberArray2,
      borderColor: 'rgba(64, 223, 205, 1)',
      backgroundColor: 'rgba(64, 223, 205, 1',
      yAxisID: 'y1',
    },
  ],
};

function generateRandomNumber (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const LineChart = () => {
  return (
    <Line options={options} data={data} />
  )
}

export default LineChart