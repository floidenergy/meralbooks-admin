// #get inspired from this page https://demo.evershop.io/admin/products/new ** email: demo@gmail.com pass: 123456
// #and this one too: https://demo.evershop.io/

import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './elements/navbar/Navbar'

import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'

import './pages/globalStyle.css'
import style from './style.module.css'

import Dashboard from './pages/dashboard/Dashboard'
import Books from './pages/books/Books'
import NewBook from './pages/books/new/new'
import Categories from './pages/categories/Categories'
import Collection from './pages/collection/Collection'
import Coupons from './pages/coupons/Coupons'

const AdminApp = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useSelector(state => state)
  const [shouldRenderNavbar, setShouldRenderNavbar] = useState(
    location.pathname !== '/login'
  )

  useEffect(() => {
    if (!user.isConnected && location.pathname !== '/login') {
      navigate('/login')
    }

    setShouldRenderNavbar(location.pathname !== '/login')
  }, [location.pathname])

  return (
    <main
      className={
        shouldRenderNavbar
          ? style.main
          : {}
      }
    >
      {shouldRenderNavbar && <Navbar />}
      <div className={style.containerData}>
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/'>
            <Route path='/' element={<Dashboard />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/new' element={<NewBook />} />
            <Route path='/Categories' element={<Categories />} />
            <Route path='/Collection' element={<Collection />} />
            <Route path='/Coupons' element={<Coupons />} />
            <Route path='/Logout' element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </main>
  )
}

export default AdminApp
