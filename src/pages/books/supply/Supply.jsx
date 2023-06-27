import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'
import { useTable } from 'react-table'
import axios from 'axios'

import Selection from '../../../elements/multipleSelection/Selection'

import style from './style.module.css'

export default function Supply () {
  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [SelectedBooks, setSelectedBooks] = useState([])
  const [selectedOption, setSelectedOption] = useState([])
  const [supplyData, setSupplyData] = useState([])

  const [resMsg, setResMsg] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: 'thumbnail',
        accessor: 'img'
      },
      {
        Header: 'ID',
        accessor: 'book.value'
      },
      {
        Header: 'Book',
        accessor: 'book.label'
      },
      {
        Header: 'Price',
        accessor: 'price'
      },
      {
        Header: 'Quantity',
        accessor: 'quantity'
      },
      {
        Header: 'Action',
        accessor: null
      }
    ],
    []
  )

  // console.log(selectedOption);
  // console.log(supplyData)

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/books').then(result => {
      setBooks(result.data)
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    setResMsg()
    if(supplyData.length === 0)
      return setResMsg("please Provide some books")
    try {
      const result = await axios.put(
        'http://localhost:3001/admin/supply',
        supplyData,
        { withCredentials: true }
      )
      navigate('/books')
    } catch (err) {
      console.log(err);
      if (err.response?.status === 511) {
        return navigate('/logout')
      }else{
        setResMsg("something bad happend");
      }

    }
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: supplyData })

  return (
    <div className={style.Supplies}>
      <header className={style.header}>
        <Link
          to={'/books/profile'}
          className={style.backB + ' button white b-purple'}
        >
          <BsArrowBarLeft />
        </Link>
      </header>
      <div className={style.main}>
        <div className={style.selectionContainer}>
          <Selection
            className={style.selectBar}
            Options={books.map(books => {
              return { value: books._id, label: books.name }
            })}
            value={selectedOption}
            multiple
            showValue={false}
            placeholder='select a book'
            onChange={opt => {
              setSelectedOption(opt)
              setSupplyData(
                opt.map(o => {
                  const currentSupply = supplyData.find(
                    spd => o.value === spd.book.value
                  )
                  if (currentSupply) return currentSupply
                  else {
                    const book = books.find(book => book._id === o.value)
                    return {
                      book: o,
                      quantity: 0,
                      img: book.img,
                      price: `${book.price} DA`
                    }
                  }
                })
              )
            }}
          />
        </div>

        <div className={style.items}>
          <table>
            <thead>
              {headerGroups.map((headerGroup, index) => {
                return (
                  <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => {
                      if (column.Header === 'ID') return <></>

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
                      if (cell.column.Header === 'ID') {
                        return <></>
                      } else if (cell.column.Header === 'thumbnail') {
                        return (
                          <td
                            key={index}
                            className={style[cell.column.Header]}
                            {...cell.getCellProps()}
                          >
                            <img src={cell.value} alt='' />
                          </td>
                        )
                      } else if (cell.column.Header === 'Quantity') {
                        return (
                          <td
                            key={index}
                            className={style[cell.column.Header]}
                            {...cell.getCellProps()}
                          >
                            <input
                              type='number'
                              name='number'
                              min={0}
                              Value={cell.value}
                              onChange={e => {
                                const nValues = supplyData.map(data => {
                                  if (
                                    data.book.value ===
                                    cell.row.values['book.value']
                                  ) {
                                    return {
                                      ...data,
                                      quantity: parseInt(e.target.value)
                                    }
                                  }
                                  return data
                                })
                                setSupplyData(nValues)
                              }}
                            />
                          </td>
                        )
                      } else if (cell.column.Header === 'Action') {
                        return (
                          <td
                            key={index}
                            className={style[cell.column.Header]}
                            {...cell.getCellProps}
                          >
                            <button
                              className={`${style.deleteButton} b-purple white`}
                              type='button'
                              onClick={() => {
                                const elementID = cell.row.allCells.find(
                                  cl => cl.column.Header === 'ID'
                                ).value
                                setSelectedOption(
                                  selectedOption.filter(
                                    sp => sp.value !== elementID
                                  )
                                )
                                // console.log(selectedOption);
                                // console.log(cell.row.allCells.find(cl => cl.column.Header === "ID").value);
                                setSupplyData(
                                  supplyData.filter(
                                    sd => sd.book.value !== elementID
                                  )
                                )
                              }}
                            >
                              &times;
                            </button>
                          </td>
                        )
                      } else {
                        return (
                          <td
                            key={index}
                            className={style[cell.column.Header]}
                            {...cell.getCellProps()}
                          >
                            <div>{cell.render('Cell')}</div>
                          </td>
                        )
                      }
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <button
          className={`${style.submitBtn} button b-purple white`}
          type='button'
          onClick={handleSubmit}
        >
          Submit
        </button>
      {resMsg && <div className={style.resStatus}><p>{resMsg}</p></div>}
      </div>
    </div>
  )
}
