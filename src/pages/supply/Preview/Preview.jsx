import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useTable } from 'react-table'

import { BsArrowBarLeft } from 'react-icons/bs'
import axios from 'axios'

import style from "./style.module.css"

export default function Preview () {
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  const [supply, setSupply] = useState()
  const [items, setItems] = useState([])

  //table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'book.img'
      },
      {
        Header: 'Name',
        accessor: 'book.name'
      },
      {
        Header: 'Price',
        accessor: 'book.price'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity'
      },
      {
        Header: 'Stock',
        accessor: 'book.quantity'
      }
    ],
    []
  )

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_LINK}/admin/supply/${id}`, {
        withCredentials: true
      })
      .then(res => {
        setSupply(res.data)
        setItems(res.data.items)
      })
  }, [id])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: items })

  console.log(supply)
  return (
    <section className={style.Preview}>
      <header className={style.header}>
        <Link to={'/books'} className={style.backB + ' button white b-purple'}>
          <BsArrowBarLeft />
        </Link>
      </header>
      <section className={style.supplyPreview}>
        <div className={style.tableInfo}>
          <p>
            Submited By:{' '}
            <span className={style.useradmin + " bold"}>
              {supply?.userAdmin.name.fName +
                ' ' +
                supply?.userAdmin.name.lName}{' '}
              ({supply?.userAdmin.username})
            </span>
          </p>
          <p>
            At:{' '}
            <span className={style.date}>
              {new Date(supply?.createdAt).toUTCString()}
            </span>
          </p>
        </div>
        <table className={style.supplyTable} {...getTableProps()}>
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
                      {cell.column.Header === 'Image' ? (
                        <div>
                          {
                            // TODO: CHANGE THE WIDTH WHEN WORKING WITH CSS}
                          }
                          <img src={cell.value} width={50} />
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
      </section>
    </section>
  )
}
