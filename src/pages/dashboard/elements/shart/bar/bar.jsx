// import React, {useRef} from 'react'
import { Bar, Line, Chart } from 'react-chartjs-2'
// import {Chart as ChartJS} from 'chart.js/auto'
import { Chart as ChartJS } from 'chart.js/auto'

function BarChart ({ ChartData }) {
  // console.log();
  return (
      <Bar
        data={{
          labels: ChartData.week.map(e => e.day.toUpperCase()),
          datasets: [
            {
              label: 'Revenue',
              data: ChartData.week.map(e => e.Revenue),
              backgroundColor: '#02c3bd'
            },
            {
              label: 'Profit',
              data: ChartData.week.map(e => e.Profit),
              backgroundColor: '#d81159'
            }
          ]
        }}

        width={null}
        options={{
          maintainAspectRatio: true
        }}
      />
  )
  // return (<>hhhh</>)
}

export default BarChart
