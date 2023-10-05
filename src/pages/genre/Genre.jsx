import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Index from './index/Index'
import New from './new/newGenre'
import Edit from './edit/editGenre'

export default function Categories() {
  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/new' element={<New />} />
      <Route path='/update' element={<Edit />}/>
    </Routes>
  )
}
