import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BsFillGiftFill,
  BsFillHouseFill,
  BsArchiveFill,
  BsLink45Deg,
  BsTagFill,
  BsEasel2Fill
} from 'react-icons/bs'
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
        <div className={style.category}>
          <p className={style.title}>QUICK LINKS</p>
          <ul>
            <li>
              <Link to='/'>
                <BsFillHouseFill /> DashBoard
              </Link>
            </li>
            <li>
              <Link to='/books/new'>
                <BsArchiveFill /> New Books
              </Link>
            </li>
            <li>
              <Link to='/coupon/new'>
                <BsFillGiftFill /> New Coupon
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.category}>
          <p className={style.title}>CATALOG</p>
          <ul>
            <li>
              <Link to='/books'>
                <GiBookCover /> books
              </Link>
            </li>
            <li>
              <Link to='/categories'>
                <BsLink45Deg /> categories
              </Link>
            </li>
            <li>
              <Link to='/collection'>
                <BsTagFill /> Collection
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.category}>
          <p className={style.title}>SALE</p>
          <ul>
            <li>
              <Link to='/orders'>
                <BsEasel2Fill /> orders
              </Link>
            </li>
          </ul>
        </div>

        <div className={style.category}>
          <p className={style.title}>PROMOTION</p>
          <ul>
            <li>
              <Link to='/coupons'>
                <BsFillGiftFill /> coupons
              </Link>
            </li>
            <li>
              <Link to='/logout'>
                <BsFillGiftFill /> logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
