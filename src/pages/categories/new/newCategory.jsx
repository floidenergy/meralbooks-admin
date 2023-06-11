import React from 'react'
import { Link } from 'react-router-dom'

import { BsArrowBarLeft } from 'react-icons/bs'

import style from './style.module.css'

function New () {
  return (
    <div className={style.main}>
      <Link to={'/authors'} className={style.backB + ' button white b-purple'}>
        <BsArrowBarLeft />
      </Link>
      <form>
        <label htmlFor='name'>
          <input type='text' name='name' id='name' />
        </label>
        <label htmlFor='description'>
          <input type='text' name='description' id='description' />
        </label>
      </form>
    </div>
  )
}

export default New
