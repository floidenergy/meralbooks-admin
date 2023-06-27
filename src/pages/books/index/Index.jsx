import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTable } from 'react-table'
import axios from 'axios'

import style from './style.module.css'

export default function Index () {
  const navigate = useNavigate
  const [books, setBooks] = useState([])
  const [supplies, setSupplies] = useState([{}])

  const columns = useMemo(
    () => [
      {
        Header: 'Agent',
        accessor: 'userAdmin.username'
      },
      {
        Header: 'Items',
        accessor: 'items.length'
      }
    ],
    []
  )

  //   userAdmin: {
  //     name: {
  //       fName: 'admin',
  //       lName: 'admin',
  //       _id: '646e9d157bb6ba4fd2e4e70a'
  //     },
  //     username: 'admin',
  //     confirmedEmail: false,
  //     shipping_info: [],
  //     order_history: [],
  //     privacyToken: [],
  //     _id: '646e9d157bb6ba4fd2e4e709'
  //   },
  //   items: [
  //     {
  //       book: '649859d561049969e6fedc9b',
  //       quantity: 7,
  //       _id: '649a72c3c978ec140eb1b127'
  //     },
  //     {
  //       book: '64985a0561049969e6fedcac',
  //       quantity: 5,
  //       _id: '649a72c3c978ec140eb1b128'
  //     },
  //     {
  //       book: '649847eeca99248bbefd01de',
  //       quantity: 10,
  //       _id: '649a72c3c978ec140eb1b129'
  //     }
  //   ],
  //   createdAt: '2023-06-27T05:25:23.976Z',
  //   updatedAt: '2023-06-27T05:25:23.976Z',
  //   __v: 0
  // }
    console.log(process.env.KEY);
  useEffect(() => {
    axios
      .get('https://meralbooks-server.floidenergy.repl.co/api/v1/books')
      .then(result => {
        // console.log(result)
        setBooks(result.data)
      })
      .catch(err => {
        console.log(err)
        if (err.response?.status === 511) {
          navigate('/logout')
        }
      })

    axios
      .get('https://meralbooks-server.floidenergy.repl.co/admin/supply', { withCredentials: true })
      .then(result => {
        console.log(result)
        setSupplies(result.data)
      })
      .catch(err => {})
  }, [navigate, ])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: supplies })

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
                    src={a.img}
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
          <Link to={'supplies'} className={`${style.nSupply} button white b-purple`}>
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
                            <div>{cell.render('Cell')}</div>
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : <p className={style.noSupplies}> No Supplies </p>}
          </div>
        </div>
      </div>
    </section>
  )
}

// {
//   _id: '649a72c3c978ec140eb1b126',
