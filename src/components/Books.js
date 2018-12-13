//This Component is for Handling the Dropdown options for Change of Shelves

import React from 'react'

const Books =  (props) => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${props.books.imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {props.moveShelf(props.books, event.target.value)}}
            value={props.books.shelf || "none"}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.books.title}</div>
      <div className="book-authors">{props.books.authors && props.books.authors[0]}</div>
    </div>
  )
}

export default Books;
