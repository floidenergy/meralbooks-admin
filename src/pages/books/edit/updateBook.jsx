import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { BsArrowBarLeft } from 'react-icons/bs'

import ConfirmationNotif from '../../../elements/confirmation/ConfirmationNotif'
import Select from '../../../elements/multipleSelection/Selection'

import style from './style.module.css'

function UpdateBook () {
  const [book, setBook] = useState({})
  const [bookPic, setBookPic] = useState()
  const [delNotif, setDelNotif] = useState(false)
  const [ResponseMessage, setResponseMessage] = useState('')

  // api's Data
  const [categoriesData, setCategoriesData] = useState([{}])
  const [authorsData, setAuthorsData] = useState([{}])
  // client's Data
  const [categories, setCategories] = useState([])
  const [author, setAuthor] = useState()
  const [language, setLanguage] = useState()

  const location = useLocation()
  const navigate = useNavigate()
  const id = new URLSearchParams(location.search).get('id')

  useEffect(() => {
    axios
      .get(`https://meralbooks-server.floidenergy.repl.co/api/v1/books/${id}`)
      .then(result => {
        setBook(result.data)
        setBookPic(result.data.img)
        setCategories(
          result.data.category.map(cat => {
            return { value: cat?._id, label: cat?.name }
          })
        )
        setAuthor({
          value: result.data.author?._id,
          label: result.data.author?.name
        })
        setLanguage({
          value: result.data.language,
          label: result.data.language
        })
      })
      .catch(err => {
        if (err.response?.status === 511) {
          navigate('/logout')
        } else {
          navigate('/books')
        }
      })

    axios
      .get('https://meralbooks-server.floidenergy.repl.co/category')
      .then(result => setCategoriesData(result.data))

    axios
      .get('https://meralbooks-server.floidenergy.repl.co/authors')
      .then(result => setAuthorsData(result.data))
  }, [id, navigate])

  const handleFileChange = async e => {
    if (e.target.files.length !== 0)
      setBookPic(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    const formData = new FormData(e.currentTarget)

    formData.append('author', author.value)
    formData.append('language', language.value)
    categories
      .map(c => c.value)
      .forEach((c, index) => {
        formData.append(`category[${index}]`, c)
      })

    try {
      const response = await axios.put(
        `https://meralbooks-server.floidenergy.repl.co/admin/book/${id}`,
        formData,
        { withCredentials: true }
      )
      setResponseMessage(response.data.message)
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
    <>
      <header className={style.header}>
        <Link
          to={{ pathname: '/books/profile', search: `?id=${book._id}` }}
          className={style.backB + ' button white b-purple'}
        >
          <BsArrowBarLeft />
        </Link>
      </header>
      <form action='' className={style.bookProfile} onSubmit={handleSubmit}>
        <div className={style.profileImage}>
          <label htmlFor='authorImage'>
            <img src={bookPic} alt={book.name} width={300} />
          </label>

          <input
            type='file'
            name='bookPicture'
            id='authorImage'
            // defaultValue={authorPic}
            accept='image/*'
            onChange={handleFileChange}
            // required
          />
        </div>

        <div className={style.bookInfo}>
          <input
            type='text'
            name='name'
            defaultValue={book.name}
            className={style.name}
          />
          <div className={style.flexDiv}>
            <div className={style.leftSide}>
              <div className={style.Author}>
                <p className={style.label}>Author</p>
                <Select
                  placeholder={'Select Author'}
                  Options={authorsData.map(cd => {
                    return { value: cd._id, label: cd.name }
                  })}
                  value={author}
                  onChange={v => setAuthor(v)}
                  className={style.input}
                />
              </div>
              <div className={style.categories}>
                <p className={style.label}>Categories</p>
                <Select
                  placeholder={'Select Category'}
                  Options={categoriesData.map(ct => {
                    return { value: ct._id, label: ct.name }
                  })}
                  value={categories}
                  onChange={v => setCategories(v)}
                  className={style.input}
                  multiple
                />
              </div>
              <div className={style.language}>
                <p className={style.label}>Language</p>
                <Select
                  placeholder={'Select language'}
                  value={language}
                  Options={[
                    { value: 'Arabic', label: 'Arabic' },
                    { value: 'French', label: 'French' },
                    { value: 'English', label: 'English' }
                  ]}
                  onChange={o => setLanguage(o)}
                  className={style.input}
                />
              </div>
              <div className={style.price}>
                <p className={style.label}>Price</p>
                <input
                  type='text'
                  name='price'
                  className={style.input}
                  defaultValue={book.price}
                  id=''
                />
              </div>
            </div>
            <div className={style.rightSide}>
              <p className={style.label}>Description</p>
              <textarea
                className={style.bio}
                name='description'
                defaultValue={book.description}
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
          message={`Are you sure you wanna delete "${book.name}"`}
          Options={[
            {
              value: 'yes',
              onClick: async e => {
                e.preventDefault()
                try {
                  const result = await axios.delete(
                    `https://meralbooks-server.floidenergy.repl.co/admin/book/${book._id}`,
                    { withCredentials: true }
                  )
                  console.log(result);
                  if (result.status === 204) {
                    navigate('/books')
                  } else {
                  }
                } catch (err) {
                  if (err.response?.status === 511) {
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
                e.preventDefault()
                setDelNotif(false)
              }
            }
          ]}
        />
      )}
    </>
  )
}

export default UpdateBook
