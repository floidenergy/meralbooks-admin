import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Card from './elements/card/Card'
import BarChart from './elements/shart/bar/bar'
import List from './elements/list/List'

import style from './dashboardStyle.module.css'

const Dashboard = () => {
  const admin = useSelector(state => state.user)

  const stateData = {
    month: {
      Sale: {
        amount: 40200,
        percentage: 1.3,
        state: 'falling'
      },
      Order: {
        amount: 130,
        percentage: 5.3,
        state: 'raising'
      },
      Revenue: {
        amount: 29000,
        percentage: 2.5,
        state: 'falling'
      },
      Profit: {
        amount: 6000,
        percentage: 10,
        state: 'raising'
      }
    },
    week: [
      {
        day: 'mon',
        Profit: '150',
        Revenue: '1500'
      },
      {
        day: 'tue',
        Profit: '500',
        Revenue: '5000'
      },
      {
        day: 'wed',
        Profit: '1200',
        Revenue: '12000'
      },
      {
        day: 'thur',
        Profit: '3000',
        Revenue: '30000'
      },
      {
        day: 'fri',
        Profit: '900',
        Revenue: '9000'
      },
      {
        day: 'sat',
        Profit: '100',
        Revenue: '1000'
      },
      {
        day: 'sun',
        Profit: '4000',
        Revenue: '40000'
      }
    ],
    topBooks: [
      {
        img: "aa"
      }
    ]
  }

  const weeklyState = {
    labels: stateData.week.map(e => e.day.toUpperCase()),
    datasets: [
      {
        label: 'Revenue',
        data: stateData.week.map(e => e.Revenue)
      },
      {
        label: 'Profit',
        data: stateData.week.map(e => e.Profit)
      }
    ]
  }

  const cards = []
  for (const state in stateData.month) {
    cards.push(
      <Card
        key={cards.length}
        label={state}
        state={stateData.month[state].state}
        percentage={stateData.month[state].percentage}
        data={stateData.month[state].amount + ' DA'}
      />
    )
  }

  return (
    <main className={style.main}>
      <section className={style.monthlyState}>
        <p className={style.title}>Monthly State</p>
        <div className={style.cards}>{cards}</div>
      </section>
      <section className={style.weeklyState}>
        <div className={style.chart}>
          <BarChart ChartData={stateData}/>
        </div>
        <div className={style.topProduct}>
          <List />
        </div>
      </section>
    </main>
  )
}

export default Dashboard

// <Card
//             label='Total Sale'
//             state={stateData.month.totalSale.state}
//             percentage={stateData.month.totalSale.percentage}
//             data={stateData.month.totalSale.amount + ' DA'}
//           />

//           <Card
//             label='Total Order'
//             state={stateData.month.totalOrder.state}
//             percentage={stateData.month.totalOrder.percentage}
//             data={stateData.month.totalOrder.amount + ' DA'}
//           />

//           <Card
//             label='Total Revenue'
//             state={stateData.month.totalRevenue.state}
//             percentage={stateData.month.totalRevenue.percentage}
//             data={stateData.month.totalRevenue.amount + ' DA'}
//           />

//           <Card
//             label='Total Profit'
//             state={stateData.month.totalProfit.state}
//             percentage={stateData.month.totalProfit.percentage}
//             data={stateData.month.totalProfit.amount + ' DA'}
//           />
