import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { BsArrowBarLeft } from 'react-icons/bs'

import style from './style.module.css'

export default function Profile () {
  const [book, setBook] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    axios
      .get(`https://meralbooks-server.floidenergy.repl.co/api/v1/books/${id}`)
      .then(result => {
        setBook(result.data)
      })
      .catch(err => navigate('/books'))
      console.log("helo");
  }, [id, navigate])

  return (
    <section className={style.Profile}>
      {book && (
        <>
          <header className={style.header}>
            <Link
              to={'/books'}
              className={style.backB + ' button white b-purple'}
            >
              <BsArrowBarLeft />
            </Link>
            <Link
              to={{ pathname: '/books/edit', search: `?id=${book._id}` }}
              className={style.backB + ' button white b-purple'}
            >
              edit
            </Link>
          </header>

          <section className={style.bookProfile}>
            <div className={style.profileImage}>
              <img src={book.img} alt={book.name} />
            </div>
            <div className={style.bookInfo}>
              <p className={style.name}>{book.name}</p>
              <div className={style.flexDiv}>
                <div className={style.leftSide}>
                  <div className={style.Author}>
                    <p className={style.label}>Author</p>
                    <Link
                      className={style.value}
                      to={`/authors/profile?id=${book.author?._id}`}
                    >
                      {book.author?.name}
                    </Link>
                    <div className={style.bookAuthor}>
                      <div className={style.imgContainer}>
                        <img src={book.author?.img} alt='' />
                      </div>
                      <div className={style.authorInfo}>
                        <p className={style.authorName}>{book.author.name}</p>
                        <p className={style.booksLength}>Books: {book.author?.books?.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className={style.categories}>
                    <p className={style.label}>Categories</p>
                    <span className={style.value}>
                      {book.category.map((cat, index) => (
                        <p
                          key={index}
                          className={style.value + ' ' + style.category}
                        >
                          {cat.name}
                        </p>
                      ))}
                    </span>
                  </div>
                  <div>
                    <p className={style.label}>Quantite</p>
                    <p className={style.value}>{book?.quantity} unit</p>
                  </div>
                  <div className={style.language}>
                    <p className={style.label}>Language</p>
                    <p className={style.value}>{book.language}</p>
                  </div>
                  <div className={style.price}>
                    <p className={style.label}>Price</p>
                    <p className={style.value}>{book.price} DA</p>
                  </div>
                </div>
                <div className={style.rightSide}>
                  <p className={style.label}>Description</p>
                  <p className={style.bio}>{book.description}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  )
}
