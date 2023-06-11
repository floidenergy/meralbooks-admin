import React from 'react'

import style from './style.module.css'

// message
// Option1
// fOption1
// Option2
// fOption2

function ConfirmationNotif ({ message, Options }) {
  return (
    <div className={style.confContainer}>
      <div className={style.confCard}>
        <p className={style.header}>{message}</p>
        <div className={style.options}>
          {Options.map((option, index) => (
            <input
              type='button'
              key={index}
              className=' button b-purple white bold'
              {...option}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConfirmationNotif
