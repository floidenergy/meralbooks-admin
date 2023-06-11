import React, { useState } from 'react'
import axios from 'axios'

import './upload.css'

import bookSkilteon from '../../../images/book.jpg'

const NewBook = () => {
  const [bookPicture, setBookPicture] = useState(bookSkilteon)

  const handleFileChange = async (e) => {
    setBookPicture(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const response = await axios.post(
        'http://localhost:3001/admin/book',
        formData,
        { withCredentials: true }
      )

      //TODO: MAKE A RESPOND DISPLAY MESSAGE
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <form className='BooksRegistrer' onSubmit={handleSubmit}>
        <label htmlFor='bookPicture'>
          <img src={bookPicture} alt='' width={400}/>
        </label>
        <input
          type='file'
          name='bookPicture'
          id='bookPicture'
          style={{ display: 'none' }}
          onChange={handleFileChange}
          required
        />
        <input type='text' name='name' placeholder='Book name' required />
        <textarea
          type='text'
          name='description'
          placeholder="Book's Description"
          required
        />
        <input
          type='text'
          name='author'
          placeholder="Book's Writer"
          required
        />
        <select name='language' required>
          <option value='Arabic'>Arabic</option>
          <option value='French'>French</option>
          <option value='English'>English</option>
        </select>

        <select name='category' id=''>
          <option>Select Category</option>
          <option value='STORY'>Story</option>
          <option value='SD'>Self Developement</option>
          <option value='RELIGION'>Religion</option>
          <option value='PHYLOSOPHY'>Phylosophy</option>
        </select>

        <input
          type='number'
          name='price'
          defaultValue='1500'
          placeholder='price'
          required
        />

        <input type='submit' value='Add' />
      </form>
    </main>
  )
}

export default NewBook
