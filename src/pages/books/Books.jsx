import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Index from './index/Index'
import New from './new/newBook'
import Profile from './profile/Profile'
import UpdateBook from './edit/updateBook'
import Supply from './supply/Supply'

function Books () {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='new' element={<New />} />
      <Route path='profile' element={<Profile />} />
      <Route path='edit' element={<UpdateBook />} />
      <Route path='supplies' element={<Supply />} />
    </Routes>
  )
}

export default Books
