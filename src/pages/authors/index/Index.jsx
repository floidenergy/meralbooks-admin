import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
import axios from 'axios'

import style from './style.module.css'

const Index = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/v1/authors')
      .then(result => {
        setAuthors(result.data)
      })
  }, [])

  return (
    <section className={style.author}>
      <header>
        <p className={style.title}>Authors</p>
        <Link to={'new'} className={style.navB + ' button white bold'}>
          Add New
        </Link>
      </header>
      <div className={style.cards}>
        {authors.map(a => ( //`profile?id=${a._id}`
          <Link key={a._id} to={{pathname: 'profile', search: `?id=${a._id}`}} className={style.card}>
            <div className={style.imageContainer}>
              <img
                src={a.img}
                // width={100}
                alt={a.name}
                className={style.avatar}
              />
            </div>
              <p className={style.name}>{a.name + ' '}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
export default Index