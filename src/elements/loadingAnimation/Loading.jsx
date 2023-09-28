import style from './style.module.css'
export default function LoadingAnimation () {
  return (
    <div className={style.container}>
      <div class={style.bookshelf_wrapper}>
        <ul class={style.books_list}>
          <li class={`${style.book_item} ${style.first}`}></li>
          <li class={`${style.book_item} ${style.second}`}></li>
          <li class={`${style.book_item} ${style.third}`}></li>
          <li class={`${style.book_item} ${style.fourth}`}></li>
          <li class={`${style.book_item} ${style.fifth}`}></li>
          <li class={`${style.book_item} ${style.sixth}`}></li>
        </ul>
        <div class={style.shelf}></div>
      </div>
    </div>
  )
}
