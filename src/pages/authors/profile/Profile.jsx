import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import { BsArrowBarLeft } from 'react-icons/bs'

import style from './style.module.css'

function Profile () {
  const [author, setAuthor] = useState({})
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    axios.get(`http://localhost:3001/authors/${id}`).then(result => {
      setAuthor(result.data)
    })
  }, [id])

  console.log(author);

  return (
    <>
      <header className={style.header}>
        <Link
          to={'/authors'}
          className={style.backB + ' button white b-purple'}
        >
          <BsArrowBarLeft />
        </Link>
        <Link
          to={{ pathname: '/authors/edit', search: `?id=${author._id}` }}
          className={style.backB + ' button white b-purple'}
        >
          edit
        </Link>
      </header>
      <section className={style.authorProfile}>
        <div className={style.profileImage}>
          <img src={author.img} alt={author.name} />
        </div>
        <div className={style.authorInfo}>
          <p className={style.name}>{author.name}</p>
          <div className={style.flexDiv}>
            <div className={style.leftSide}>
              <div className={style.dob}>
                <p className={style.label}>Birthday</p>
                <p className={style.dobValue}>{author.UTCdob}</p>
              </div>
            </div>
            <div className={style.rightSide}>
              <p className={style.label}>Biography</p>
              <p className={style.bio}>{author.bio}</p>
            </div>
          </div>
        </div>
      </section>
      <div className={style.books}>
        <p className={style.label}>Books</p>
        <br />
        {author.books?.length !== 0 ? (
          <div className={style.bookCards}>
            {author.books?.map(book => (
              <Link key={book._id} className={style.card} to={`/books/profile?id=${book._id}`}>
                <div className={style.imageContainer}>
                <img
                  src={book.img}
                  // width={100}
                  alt={book.name}
                  className={style.avatar}
                />
              </div>
              <p className={style.name}>{book.name}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className={style.placeholder}>
            Sorry We Dont have any books for this author
          </p>
        )}
      </div>
    </>
  )
}

export default Profile
