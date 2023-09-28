import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import { BsFillSendFill } from 'react-icons/bs'
import axios from 'axios'

import style from './style.module.css'

export default function Index () {
  const navigate = useNavigate
  const [books, setBooks] = useState([])
  const [supplies, setSupplies] = useState([{}])

  const columns = useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'userAdmin.username'
      },
      {
        Header: 'Items',
        accessor: 'items.length'
      },
      {
        Header: 'Date',
        accessor: 'createdAt'
      },
      {
        Header: 'View',
        accessor: '_id'
      }
    ],
    []
  )

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/api/v1/books`)
      .then(result => {
        console.log(result.data)
        setBooks(result.data)
      })
      .catch(err => {
        console.log(err)
        if (err.response?.status === 511) {
          navigate('/logout')
        }
      })

    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/admin/supply`, {
        withCredentials: true
      })
      .then(result => {
        setSupplies(result.data)
      })
      .catch(err => {})
  }, [navigate])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: supplies })
  
  console.log(supplies);
  return (
    <section className={style.books}>
      <header>
        <p className={style.title}>Books</p>
        <Link to={'new'} className={style.navB + ' button white bold'}>
          Add New
        </Link>
      </header>
      <div className={style.index}>
        <div className={style.cards}>
          {books.map(
            (
              a //`profile?id=${a._id}`
            ) => (
              <Link
                key={a._id}
                to={{ pathname: 'profile', search: `?id=${a._id}` }}
                className={style.card}
              >
                <div className={style.imageContainer}>
                  <img
                    src={a.thumb}
                    // width={100}
                    alt={a.name}
                    className={style.avatar}
                  />
                </div>
                <p className={style.name}>{a.name + ' '}</p>
              </Link>
            )
          )}
        </div>
        <div className={style.supplies}>
          <Link
            to={'/Supply'}
            className={`${style.nSupply} button white b-purple`}
          >
            new Supplies
          </Link>
          <div>
            {supplies.length !== 0 ? (
              <table className={style.suppliesTable} {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, index) => (
                        <th key={index} {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row)
                    return (
                      <tr key={index} {...row.getRowProps()}>
                        {row.cells.map((cell, index) => (
                          <td key={index} {...cell.getCellProps()}>
                            {cell.column.Header === 'Date' ? (
                              <div>
                                {new Date(cell.value).toLocaleDateString('fr')}
                              </div>
                            ) : cell.column.Header === 'View' ? (
                              <div>
                                <Link to={`/supply/Preview?id=${cell.value}`}><BsFillSendFill /></Link>
                              </div>
                            ) : (
                              <div>{cell.render('Cell')}</div>
                            )}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <p className={style.noSupplies}> No Supplies </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// {
//   _id: '649a72c3c978ec140eb1b126',
