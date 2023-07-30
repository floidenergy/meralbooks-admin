import React from 'react'
import { Routes, Route } from 'react-router-dom'

import New from './New/New'
import Preview from './Preview/Preview'

export default function Supply() {
  return (
    <Routes>
      <Route path='/' element={<New />} />
      <Route path="/Preview" element={<Preview />} />
    </Routes>
  )
}
