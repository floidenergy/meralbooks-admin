import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'
import axios from 'axios'

import style from './style.module.css'

export default function EditCategory () {
  const [category, setCategory] = useState({})
  const [ResponseMessage, setResponseMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    const getAuthorData = async () => {
      const result = await axios.get(`http://localhost:3001/Category/${id}`)
      setCategory(result.data)
    }

    getAuthorData()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    // const formData = new FormData(e.currentTarget)
    console.log("submited");

    try {
      const response = await axios.put(
        `http://localhost:3001/admin/category/${id}`,
        formData,
        { withCredentials: true }
      )
      navigate('/categories')
    } catch (err) {
      if (err.response) {
        if (err.response.status === 511) {
          return navigate('/logout')
        }
        console.log(err)
        setResponseMessage(err.response.data.error)
      }
      setResponseMessage('Something bad happend')
    }
  }

  return (
    <section className={style.editCategory}>
      <header className={style.header}>
        <Link
          to={{ pathname: '/authors/profile', search: `?id=${category._id}` }}
          className={style.backB + ' button white b-purple'}
        >
          <BsArrowBarLeft />
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <p>Name</p>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='ex. Self Development'
            defaultValue={category.name}
            required
          />
        </label>
        <label htmlFor='description'>
          <p>description</p>
          <input
            type='text'
            name='description'
            placeholder='ex. books to improve your self and your life style'
            defaultValue={category.description}
            id='description'
          />
        </label>
        <p className={style.resMsg}>{ResponseMessage}</p>
        <input
          type='submit'
          value='Update'
          className={style.subButton + ' button b-purple white'}
        />
      </form>
    </section>
  )
}
