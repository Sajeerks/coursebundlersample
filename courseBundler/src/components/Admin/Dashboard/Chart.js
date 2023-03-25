import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);








export const LineChart = ({ views = [1,2,5000] }) => {
    const labels = getLastYearMonths();
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Yearly Views',
        },
      },
    };
  
    const data = {
      labels,
      datasets: [
        {
          label: 'Views',
          data: views,
          borderColor: 'rgba(107,70,193,0.5)',
          backgroundColor: '#6b46c1',
        },
      ],
    };
  
    return <Line options={options} data={data} />;
  };
  


  export const DoughnutChart = ({ users = [10,20] }) => {
    const data = {
      labels: ['Subscribed', 'Not Subscribed'],
      datasets: [
        {
          label: 'Views',
          data: users,
          borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
          backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
          borderWidth: 1,
        },
      ],
    };
  
    return <Doughnut data={data} />;
  };


  function getLastYearMonths() {
    const labels = [];
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const currentMonth = new Date().getMonth();
    // console.log({currentMonth});
  
    const remain = 11 - currentMonth;
    // console.log({remain});
  
    for (let i = currentMonth; i < months.length; i--) {
      const element = months[i];
      labels.unshift(element);
      if (i === 0) break;
    }
    // console.log("labels at first==", labels);
  
    for (let j = 11; j > currentMonth; j--) {
        // console.log(j);
      if (j === currentMonth) {
        // console.log("iam breaking");/
        break;
      } 
      const element = months[j];
      labels.unshift(element);
    }
    // console.log("labels at lat==", labels);
  
    return labels;
  }
  