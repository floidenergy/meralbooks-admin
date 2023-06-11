import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { BsArrowBarLeft } from 'react-icons/bs'

import ConfirmationNotif from '../../../elements/confirmation/ConfirmationNotif'

import style from './style.module.css'

/**
 * {
 * "_id": "647ef150b7ed0717e9e112b6",
 * "img": "http://localhost:3001/author/Author-1686040912253.jpg",
 * "name": "hdaydi man",
 * "bio": "win yedkhol f salla ihes ruho howa chikorha",
 * "dob": "1996-06-12T00:00:00.000Z",
 * "books": []
 * }
 */

export default function EditAuthors () {
  const [author, setAuthor] = useState({})
  const [authorPic, setAuthorPic] = useState()
  const [dob, setDob] = useState('')
  const [delNotif, setDelNotif] = useState(false)
  const [ResponseMessage, setResponseMessage] = useState('Success')

  const location = useLocation()
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    const getAuthorData = async () => {
      const result = await axios.get(`http://localhost:3001/authors/${id}`)
      setAuthor(result.data)
      // const d = new Date(result.data.dob)
      // console.log(d)

      // _dob = d.toISOString().split('T')[0]
      // console.log(_dob)
      setDob(result.data.dob.substring(0, 10))
      setAuthorPic(result.data.img)
    }

    getAuthorData()
  }, [id])

  const handleFileChange = async e => {
    if (e.target.files.length !== 0)
      setAuthorPic(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    // const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    const formData = new FormData(e.currentTarget)

    try {
      const response = await axios.put(
        `http://localhost:3001/admin/author/${id}`,
        formData,
        { withCredentials: true }
      )
      setResponseMessage(response.data.message)
    } catch (err) {
      if (err.response) {
        if(err.response.status === 511) {
          return navigate('/logout')
        }
        console.log(err)
        setResponseMessage(err.response.data.error)
      }
      setResponseMessage('Something bad happend')
    }
  }

  return (
    <>
      <header className={style.header}>
        <Link
          to={{ pathname: '/authors/profile', search: `?id=${author._id}` }}
          className={style.backB + ' button white b-purple'}
        >
          <BsArrowBarLeft />
        </Link>
      </header>

      <form action='' className={style.authorProfile} onSubmit={handleSubmit}>
        <div className={style.profileImage}>
          <label htmlFor='authorImage'>
            <img src={authorPic} alt={author.name} width={300} />
          </label>

          <input
            type='file'
            name='authorImage'
            id='authorImage'
            // defaultValue={authorPic}
            accept='image/*'
            onChange={handleFileChange}
            // required
          />
        </div>

        <div className={style.authorInfo}>
          <input
            type='text'
            name='name'
            defaultValue={author.name}
            className={style.name}
          />
          <div className={style.flexDiv}>
            <div className={style.leftSide}>
              <p className={style.label}>Birthday</p>
              <input
                type='date'
                name='dob'
                defaultValue={dob}
                className={style.dobValue}
                onChange={e => console.log(e.target.value)}
              />
            </div>
            <div className={style.rightSide}>
              <p className={style.label}>Biography</p>
              <textarea
                className={style.bio}
                name='bio'
                defaultValue={author.bio}
                rows={15}
                cols={50}
              ></textarea>
            </div>
          </div>
          <p className={style.resMsg}>{ResponseMessage}</p>
          <input
            type='submit'
            value='Update'
            className={style.submitBtn + ' button b-purple white'}
          />
          <button
            type='button'
            className={style.delButton + ' button b-black white'}
            onClick={e => {
              setDelNotif(true)
            }}
          >
            Delete
          </button>
        </div>
      </form>
      {delNotif && (
        <ConfirmationNotif
          message={`Are you sure you wanna delete "${author.name}"`}
          Options={[
            {
              value: 'yes',
              onClick: async e => {
                e.preventDefault()
                try {
                  const result = await axios.delete(
                    `http://localhost:3001/admin/author/${author._id}`,
                    { withCredentials: true }
                  )
                  if (result.status === 204) {
                    navigate('/authors');
                  }else{
                    
                  }
                } catch (err) {
                  if(err.response && err.response.status === 511) {
                    navigate('/logout')
                  }
                  // console.log(err.response.status);
                  setResponseMessage('something went wrong')
                  setDelNotif(false)
                }
              }
            },
            {
              value: 'No',
              onClick: e => {
                e.preventDefault();
                setDelNotif(false)
              }
            }
          ]}
        />
      )}
    </>
  )
}
