import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import style from './style.module.css'

export default function Index () {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/books').then(result => {
      console.log(result.data);
      setBooks(result.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <section className={style.books}>
      <header>
        <p className={style.title}>Books</p>
        <Link to={'new'} className={style.navB + ' button white bold'}>
          Add New
        </Link>
      </header>
      <div className={style.cards}>
        {books.map(
          (
            a //`profile?id=${a._id}`
          ) => (
            <Link
              key={a._id}
              to={{ pathname: 'profile', search: `?id=${a._id}` }}
              className={style.card}
            >
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
          )
        )}
      </div>
    </section>
  )
}
