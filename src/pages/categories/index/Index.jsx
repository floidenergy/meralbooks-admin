import React, { useMemo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs'
import axios from 'axios'

import style from './style.module.css'
import ConfirmationNotif from '../../../elements/confirmation/ConfirmationNotif'

const Index = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [notifData, setNotifData] = useState({})
  const [isNotif, setIsNotif] = useState(false)
  const data = useMemo(() => categories, [categories])
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Books',
        accessor: 'length'
      },
      {
        Header: 'Actions',
        accessor: '_id'
      }
    ],
    []
  )

  useEffect(() => {
    axios.get('https://meralbooks-server.floidenergy.repl.co/api/v1/category').then(res => {
      setCategories(res.data)
    })
  }, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  const deleteCategory = categoryID => {
    setNotifData({
      message: `You really want to delete this category`,
      Options: [
        {
          value: 'yes',
          onClick: () => {
            axios
              .delete(`https://meralbooks-server.floidenergy.repl.co/admin/category/${categoryID}`, {
                withCredentials: true
              })
              .then(() => {
                navigate(0)
              })
              .catch(err => {
                if (err.response) {
                  if (err.response.status === 511) navigate('/logout')
                }

                setNotifData({
                  message: 'something bad happend',
                  Options: [{ value: 'OK', onClick: () => setIsNotif(false) }]
                })
                setIsNotif(true)
              })
          }
        },
        {
          value: 'No',
          onClick: () => setIsNotif(false)
        }
      ]
    })
    setIsNotif(true)
  }

  return (
    <section className={style.categories}>
      {isNotif && <ConfirmationNotif {...notifData} />}
      <header>
        <p className={style.title}>Categories</p>
        <Link to={'new'} className={style.navB + ' button white bold'}>
          Add New
        </Link>
      </header>
      <div>
        <section className={style.categoryTableSection}>
          <table className={style.categoriesTable} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => {
                return (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => {
                      if (column.Header === 'id') {
                        return (
                          <th key={index} {...column.getHeaderProps()}>
                            {'Action'}
                          </th>
                        )
                      } else
                        return (
                          <th key={index} {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        )
                    })}
                  </tr>
                )
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row)
                return (
                  <tr key={index} {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      if (cell.column.Header === 'Actions') {
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            <div className={style.actionButton}>
                              <Link
                                to={`update?id=${cell.value}`}
                                className='button b-black white'
                              >
                                <BsPencilSquare />
                              </Link>
                              <button
                                type='button'
                                className='button b-purple white'
                                onClick={() => deleteCategory(cell.value)}
                              >
                                <BsFillTrash3Fill />
                              </button>
                            </div>
                          </td>
                        )
                      } else
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            <div>{cell.render('Cell')}</div>
                          </td>
                        )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  )
}

export default Index
