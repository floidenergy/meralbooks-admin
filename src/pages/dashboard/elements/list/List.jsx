import React from 'react'
import style from './listStyle.module.css'

function List({books}) {
  //{id, image, name, type, stock, color, totalRevenue}
  return (
    <table className={style.table}>
      <tr>
        <td className={style.bookImg}>
          <img src="" alt="" /></td>
        <td>
          <div className={style.label}>
            <p className={style.name}>Atomic Habits</p>
            <p className={style.type}>self developements</p>
          </div>
        </td>
        <td>
          <div className={style.stock} style={{backgroundColor: 'green'}}>in Stock</div>
        </td>
        <td><p className={style.price}>2289DA</p></td>
      </tr>
    </table>
  )
}

export default List;
