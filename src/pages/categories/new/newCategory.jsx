import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { BsArrowBarLeft } from 'react-icons/bs'

import style from './style.module.css'

function New () {
  const navigate = useNavigate()
  const [responseMessage, setResponseMessage] = useState('')

  return (
    <div className={style.main}>
      <Link to={'/categories'} className={style.backB + ' button white b-purple'}>
        <BsArrowBarLeft />
      </Link>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

          try {
            const response = await axios.post(
              'https://meralbooks-server.floidenergy.repl.co/admin/category',
              formData,
              { withCredentials: true }
            )
            if(response.status === 201)
              navigate('/Categories')
            else
              throw Error()
          } catch (err) {
            if (err.response) {
              if (err.response.status === 511) {
                navigate('/logout')
              }
              console.log(err)
              setResponseMessage(err.response.data.error)
            }
            setResponseMessage('Something bad happend')
          }
        }}
      >
        <label htmlFor='name'>
          <p>Name</p>
          <input type='text' name='name' id='name' placeholder='ex. Self Development' required />
        </label>
        <label htmlFor='description'>
          <p>description</p>
          <input type='text' name='description' placeholder='ex. books to improve your self and your life style' id='description' />
        </label>
        <p className={style.resMsg}>{responseMessage}</p>
        <input
          type='submit'
          value='Add'
          className={style.subButton + ' button b-purple white'}
        />
      </form>
    </div>
  )
}

export default New
