import React, { useState, useEffect, useRef } from 'react'

import style from './style.module.css'

export default function Select ({
  placeholder,
  multiple,
  value,
  onChange,
  Options,
  className
}) {
  const searchInput = useRef(null)
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions([...Options])
    if (multiple) {
      onChange([])
    } else {
      onChange()
    }
  }, [])

  useEffect(() => {
    setOptions(Options)
    // console.log(searchInput.current.disabled)
    // searchInput.current.disabled = !searchInput.current.disabled;
  }, [showOptions])

  return (
    <div
      className={`${style.selectContainer} ${
        className !== undefined ? className : ''
      }`}
      tabIndex={0}
      onBlur={e => {
        setShowOptions(false)
      }}
      onClick={() => {
        // searchInput.current.focus()
        setOptions(Options)
        setShowOptions(!showOptions)
        // searchInput.current.disabled = false
      }}
      onFocus={() => setShowOptions(true)}
    >
      <span className={style.values}>
        <span className={style.value}>
          {multiple ? (
            value?.map(v => {
              return (
                <p
                  key={v.value}
                  onClick={e => {
                    e.stopPropagation()
                    setShowOptions(false)
                    onChange(value.filter(_v => v.value !== _v.value))
                  }}
                  className={`${style.multiSelOption}`}
                >
                  {v.label}
                  <span className={style.selOptionRemover}>&times;</span>
                </p>
              )
            })
          ) : (
            <p className={`${style.selOption}`}>{value?.label}</p>
          )}
          <input
            placeholder={placeholder}
            className={`${style.searchValue} ${showOptions && style.show}`}
            type='text'
            name=''
            id=''
            onClick={e => {
              e.stopPropagation();
              // setShowOptions(!showOptions)
            }}
            onChange={e => {
              e.stopPropagation()
              const pattern = new RegExp(e.target.value)
              setOptions(Options.filter(op => pattern.test(op.label)))
            }}
            // disabled
          />
        </span>
      </span>
      <button
        className={style.clearBtn}
        onClick={e => {
          e.stopPropagation()
          multiple ? onChange([]) : onChange()
        }}
        type='button'
      >
        &times;
      </button>
      <div className={style.divider}></div>
      <div className={style.caret}></div>
      <ul className={`${style.options} ${showOptions && style.show}`}>
        {options?.map((option, index) =>
          multiple ? (
            value.find(v => v.value === option.value) ? (
              ""
            ) : (
              <li
                key={index}
                onClick={e => {
                  // console.log('option')
                  onChange([...value, option])
                }}
                className={style.option}
              >
                {option.label}
              </li>
            )
          ) : (
            option.value !== value?.value && (
              <li
                key={index}
                onClick={() => {
                  // console.log('option')
                  onChange(option)
                }}
                className={style.option}
              >
                {option.label}
              </li>
            )
          )
        )}
      </ul>
    </div>
  )
}
