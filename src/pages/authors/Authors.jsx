import React from 'react'
import { Route, Routes } from 'react-router-dom'

import NewAuthor from './new/newAuthor'
import Index from './index/Index'
import Profile from './profile/Profile'
import EditAuthors from './edit/EditAuthors'

function Authors () {
  return (
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/new' element={<NewAuthor />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/edit' element={<EditAuthors />} />
      </Routes>
  )
}

export default Authors
