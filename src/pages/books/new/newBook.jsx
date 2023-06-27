import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsArrowBarLeft } from 'react-icons/bs'

import style from './style.module.css'

import bookSkilteon from '../../../images/book.jpg'
import NotifCard from '../../../elements/confirmation/ConfirmationNotif'
import Select from '../../../elements/multipleSelection/Selection'

const NewBook = () => {
  const navigate = useNavigate()
  const [bookPicture, setBookPicture] = useState(bookSkilteon)
  // api's Data
  const [categoriesData, setCategoriesData] = useState([{}])
  const [authorsData, setAuthorsData] = useState([{}])
  // client's Data
  const [categories, setCategories] = useState([])
  const [author, setAuthor] = useState()
  const [language, setLanguage] = useState()
  //*********** */
  const [isNotified, setIsNotified] = useState(false)
  const [notifData, setNotifData] = useState({})

  useEffect(() => {
    axios.get('https://meralbooks-server.floidenergy.repl.co/api/v1/authors').then(res => {
      setAuthorsData(
        res.data.map(({ name, _id }) => {
          return { name, _id }
        })
      )
    })

    axios
      .get('https://meralbooks-server.floidenergy.repl.co/api/v1/category')
      .then(res => setCategoriesData(res.data))
  }, [])

  const handleFileChange = async e => {
    setBookPicture(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const elements = Array.from(e.currentTarget.elements)
    elements.forEach(e => (e.parentElement.style = 'border: none;'))
    if (!e.currentTarget.checkValidity()) {
      const invalidElements = elements.filter(e => !e.checkValidity())
      invalidElements.forEach(
        e => (e.parentElement.style = 'border: 1px solid red;')
      )
      return
    }
    const formData = new FormData(e.currentTarget)
    formData.append('author', author.value)
    formData.append('language', language.value)
    categories.map(c => c.value).forEach((c, index) => {
      formData.append(`category[${index}]`, c);
    })
    
    try {
      const response = await axios.post(
        'https://meralbooks-server.floidenergy.repl.co/admin/book',
        formData,
        { withCredentials: true }
      )

      console.log(response)
      setNotifData({
        message: 'book added',
        Options: [{ value: 'ok', onClick: () => navigate('/books') }]
      })
      setIsNotified(true)
    } catch (err) {
      if (err.response) {
        if (err.response.data.message) {
          setNotifData({
            message: err.response.data.message,
            Options: [{ value: 'ok', onClick: () => setIsNotified(false) }]
          })
          setIsNotified(true)
          return
        }
      }
      setNotifData({
        message: 'something bad happend',
        Options: [{ value: 'ok', onClick: () => navigate('/books') }]
      })
    }
  }

  return (
    <div className={style.newBook}>
      <Link to={'/authors'} className={style.backB + ' button white b-purple'}>
        <BsArrowBarLeft />
      </Link>
      <form className='BooksRegistrer' onSubmit={handleSubmit} noValidate>
        <section className={style.imageSec}>
          <label htmlFor='bookPicture'>
            <img src={bookPicture} alt='' width={400} />
            <input
              type='file'
              name='bookPicture'
              id='bookPicture'
              style={{ display: 'none' }}
              onChange={handleFileChange}
              required
            />
          </label>
        </section>

        <section className={style.bookInfo}>
          <label htmlFor='name'>
            <p className={style.title}>Book's Name</p>
            <input
              id='name'
              type='text'
              name='name'
              placeholder='Book name'
              required
            />
          </label>

          <label htmlFor='description'>
            <p className={style.title}>Book's Description</p>
            <textarea
              id='description'
              type='text'
              name='description'
              placeholder="Book's Description"
              required
            />
          </label>

          <label htmlFor='author'>
            <p className={style.title}>Author</p>
            <Select
              placeholder={'Select author'}
              value={author}
              Options={authorsData.map(cd => {
                return { value: cd._id, label: cd.name }
              })}
              onChange={o => setAuthor(o)}
              className={style.Select}
            />
          </label>

          <label htmlFor='language'>
            <p className={style.title}>Language</p>
            <Select
              placeholder={'Select language'}
              value={language}
              Options={[
                { value: 'Arabic', label: 'Arabic' },
                { value: 'French', label: 'French' },
                { value: 'English', label: 'English' }
              ]}
              onChange={(o) => setLanguage(o)}
              className={style.Select}
            />
          </label>
          <label htmlFor='category'>
            <p className={style.title}>Category</p>
            <Select
              placeholder={'Select Categories'}
              value={categories}
              Options={categoriesData.map(cd => {
                return { value: cd._id, label: cd.name }
              })}
              onChange={o => setCategories(o)}
              className={style.Select}
              multiple
            />
          </label>

          <label htmlFor='price'>
            <p className={style.title}>Price</p>
            <input
              id='price'
              type='number'
              name='price'
              placeholder='price'
              required
            />
          </label>

          <input
            type='submit'
            value='Upload book'
            className='button b-purple white'
          />
        </section>
      </form>
      {isNotified && <NotifCard {...notifData} />}
    </div>
  )
}

export default NewBook
