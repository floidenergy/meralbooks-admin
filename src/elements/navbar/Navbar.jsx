import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import {
//   BsFillGiftFill,
//   BsFillHouseFill,
//   BsArchiveFill,
//   BsLink45Deg,
//   BsTagFill,
//   BsEasel2Fill,
//   BsPen,
//   BsFillPersonFill,
//   BsUnindent,
//   BsPersonFillLock
// } from 'react-icons/bs'
import * as Bs from 'react-icons/bs'
import { TiThMenu } from 'react-icons/ti'
import { GiBookCover } from 'react-icons/gi'

import style from './adminNavbar.module.css'

export default function Navbar () {
  const [navbarClasses, setNavbarClasses] = useState({
    isActive: false,
    classes: style.navbar
  })

  return (
    <>
      <div
        className={style.navButton}
        onClick={e => {
          if (navbarClasses.isActive) {
            setNavbarClasses({
              isActive: false,
              classes: style.navbar
            })
          } else {
            setNavbarClasses({
              isActive: true,
              classes: style.navbar + ' ' + style.Active
            })
          }
        }}
      >
        <TiThMenu />
      </div>
      <nav className={navbarClasses.classes}>
        <div className={style.genre}>
          <p className={style.title}>QUICK LINKS</p>
          <ul>
            <li>
              <Link to='/'>
                <Bs.BsFillHouseFill /> DashBoard
              </Link>
            </li>
            <li>
              <Link to='/books/new'>
                <Bs.BsArchiveFill /> New Books
              </Link>
            </li>
            <li>
              <Link to='/coupon/new'>
                <Bs.BsFillGiftFill /> New Coupon
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.genre}>
          <p className={style.title}>CATALOG</p>
          <ul>
            <li>
              <Link to='/books'>
                <GiBookCover /> books
              </Link>
            </li>
            <li>
              <Link to='/categories'>
                <Bs.BsLink45Deg /> categories
              </Link>
            </li>
            <li>
              <Link to='/authors'>
                <Bs.BsPen /> Authors
              </Link>
            </li>
            <li>
              <Link to='/collection'>
                <Bs.BsTagFill /> Collection
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.genre}>
          <p className={style.title}>SALE</p>
          <ul>
            <li>
              <Link to='/orders'>
                <Bs.BsEasel2Fill /> orders
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.genre}>
          <p className={style.title}>PROMOTION</p>
          <ul>
            <li>
              <Link to='/coupons'>
                <Bs.BsFillGiftFill /> coupons
              </Link>
            </li>
          </ul>
        </div>
        <div className={style.genre}>
          <p className={style.title}>SETTINGS</p>
          <ul>
            <li>
              <Link to='/Settings/Account'>
                <Bs.BsFillPersonFill /> Account Settings
              </Link>
            </li>
            <li>
              <Link to='/Settings/admin'>
                <Bs.BsPersonFillLock /> Admin Settings
              </Link>
            </li>
            <li>
              <Link to='/logout'>
                <Bs.BsUnindent /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
