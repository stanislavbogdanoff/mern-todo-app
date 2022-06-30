import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({share}) => {
  const data = {
    labels: ['Done', 'Not Done'],
    datasets: [
      {
        label: 'Market Share',
        data: [share, 100 - share],
        backgroundColor: [
          ' rgb(108, 201, 87)',
          'rgb(0, 70, 117)',
        ],
        borderColor: [
          ' rgb(108, 201, 87)',
          'rgb(0, 70, 117)',
        ],
        borderWidth: 2,
      },
    ],
  }
  const options = {
    responsive: true,
    cutout: 45,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="pie-chart">
      <Doughnut data={data} options={options}/>
    </div>
  )
}

export default PieChart