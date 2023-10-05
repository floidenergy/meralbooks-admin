import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { BsArrowBarLeft } from 'react-icons/bs'

import LoadingAnimation from '../../../elements/loadingAnimation/Loading'

import style from './style.module.css'

import imageUpload from '../../../images/image_upload.png'

function NewAuthor () {
  const [authorPic, setAuthorPic] = useState(imageUpload)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleFileChange = async e => {
    if (e.target.files.length !== 0)
      setAuthorPic(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_LINK}/admin/author`,
        formData,
        { withCredentials: true }
      )
      setResponseMessage(response.data.message)
      e.target.reset()
      setAuthorPic(imageUpload)
    } catch (err) {
      if (err.response) {
        if (err.response.status === 511) {
          navigate('/logout')
        }
        console.log(err)
        setResponseMessage(err.response.data.error)
      }
      console.log(err)
      setResponseMessage('Something bad happend')
    }
    setIsLoading(false)
  }

  return (
    <div className={style.main}>
      {isLoading && <LoadingAnimation />}
      <Link to={'/authors'} className={style.backB + ' button white b-purple'}>
        <BsArrowBarLeft />
      </Link>
      <form onSubmit={handleSubmit}>
        <section className={style.imageSec}>
          <label htmlFor='authorImage'>
            <img src={authorPic} alt='' />
          </label>
          <input
            type='file'
            name='authorImage'
            id='authorImage'
            accept='image/*'
            onChange={handleFileChange}
            required
          />
        </section>

        <section className={style.authorInfo}>
          <label htmlFor='name'>
            <p className={style.label}>Author's Name</p>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='J. Peterson'
              required
            />
          </label>
          <label htmlFor='bio'>
            <p className={style.label}>Author's Bio</p>
            <textarea
              name='bio'
              id='bio'
              cols='30'
              rows='10'
              placeholder='Born in XXXX, he was a cleaver peson from the childhood ...'
              required
            />
          </label>
          <label htmlFor='dob'>
            <p className={style.label}>Author's Birthday</p>
            <input type='date' name='dob' id='dob' required />
          </label>
          <p className={style.responseMessage}>{responseMessage}</p>
          <input
            type='submit'
            value='Upload Author'
            className='button b-purple white'
          />
        </section>
      </form>
    </div>
  )
}

export default NewAuthor
