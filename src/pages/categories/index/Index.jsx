import React from 'react'
import { Link } from 'react-router-dom'

import style from './style.module.css'

function Index() {
  return (
    <section className={style.categories}>
      <header>
        <p className={style.title}>Categories</p>
        <Link to={'new'} className={style.navB + ' button white bold'}>
          Add New
        </Link>
      </header>
      <div>
        
      </div>
    </section>
  )
}

export default Index