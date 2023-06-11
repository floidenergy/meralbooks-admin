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
  }, [])

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
    </>
  )
}

export default Profile
