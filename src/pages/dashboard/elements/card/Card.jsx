import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'

import style from './stateCard.module.css'
function Card ({ label, state, percentage, data, colorGradient }) {
  const per = {}

  if (state === 'raising') {
    per.style = {
      backgroundImage: 'linear-gradient(rgba(11, 167, 2, 1), rgba(92, 179, 87, 1))',
      color: 'white'
    }
    per.arrow = BsArrowUpRight
  } else {
    per.style = {
      backgroundImage: 'linear-gradient(0.25turn, rgba(255, 33, 59, 1), rgba(248, 70, 91, 1)',
      color: 'white'
    }
    per.arrow = BsArrowDownRight
  }

  return (
    <div className={style.card}>
      <header className={style.header}>
        <p className={style.label}>{label}</p>
        <div className={style.percentage} style={per.style}>
          <per.arrow /> {percentage}%
        </div>
      </header>
      <div className={style.amount}>
        {data}
      </div>
    </div>
  )
}

export default Card
