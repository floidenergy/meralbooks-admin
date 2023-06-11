import React, { useState } from 'react'
import axios from 'axios'
export default function NewBook () {

  // const [selected ]

  const handleSubmit = async e => {
    e.preventDefault()

    // const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    // const formData = e.currentTarget[0].files[0];
    const formData = new FormData(e.currentTarget)

    // return console.log(formData.get('file'))

    try {
      const res = await axios.post(
        'http://localhost:3001/admin/test',
        formData,
        { withCredentials: true }
      )

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' name='file' id='' />
      <input type='submit' />
    </form>
  )
}
