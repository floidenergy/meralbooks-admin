import React, { useState } from 'react'
import axios from 'axios'

import './upload.css'

import bookSkilteon from '../../../images/book.jpg'

const NewBook = () => {
  const [bookPicture, setBookPicture] = useState(bookSkilteon)

  // const fr = new FileReader();

  // fr.onload = () =>{
  //     setBookPicture(fr.result);
  //     console.log(fr.result);
  // }

  // const handleFileChange = async (e) => {
  //     fr.readAsDataURL(e.target.files[0]);
  // }

  const handleSubmit = async e => {
    e.preventDefault()
    // const formData = new FormData(e.target);
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())

    // formData.append('bookPicture', bookPicture)
    // for (let index = 0; index < e.target.length; index++) {
    //   const eData = e.target[index]

    //   if (eData.type === 'submit') continue

    //   formData.append(eData.name, eData.value)
    // }

    console.log(formData)

    try {
      const response = await axios.post(
        'http://localhost:3001/admin/books',
        formData,
        { withCredentials: true }
      )

      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form className='BooksRegistrer' onSubmit={handleSubmit}>
        <label htmlFor='bookPicture'>
          <img src={bookPicture} alt='' />
        </label>
        <input
          type='file'
          name='bookPicture'
          id='bookPicture'
          style={{ display: 'none' }}
          //   onChange={handleFileChange}
          required
        />
        <input type='text' name='name' placeholder='Book name' required />
        <input
          type='text'
          name='description'
          placeholder="Book's Description"
          required
        />
        <input
          type='text'
          name='author'
          id=''
          placeholder="Book's Writer"
          required
        />
        <select name='language' id='' required>
          <option value='Arabic'>Arabic</option>
          <option value='French'>French</option>
          <option value='English'>English</option>
        </select>
        <select name='Category' id=''>
          <option>Select Category</option>
          <option value='STORY'>Story</option>
          <option value='SD'>Self Developement</option>
          <option value='RELIGION'>Religion</option>
          <option value='PHYLOSOPHY'>Phylosophy</option>
        </select>

        <select name='availability' id=''>
          <option>Select Availability</option>
          <option value={true}>available</option>
          <option value={false}>unavailable</option>
        </select>

        <input type='number' name='quantity' placeholder='Quantity' required />
        <input
          type='number'
          name='price'
          value='1500'
          onChange={e => e.target}
          placeholder='price'
          required
        />

        <input type='submit' value='Register' />
      </form>
    </div>
  )
}

export default NewBook
