//This component is when a search for books is done

import React from 'react'
import { Link } from 'react-router-dom'
import Books from '../Books'
import * as BooksAPI from '../../BooksAPI'

class SearchPage extends React.Component {
	state = {
		booksSearch: [],
		query: ''
	}
	updateQuery = (query) => {
		this.setState({ query })
		this.bookSearch(query)
	}


	bookSearch() {
		if(this.state.query === '' || this.state.query === undefined) {
			return this.setState({ booksSearch: [] });
		}
		BooksAPI.search(this.state.query).then(resp => {
			if(resp.error) {
				return this.setState({ booksSearch: [] });
			}
			else {
				resp = resp.filter((book) => (book.imageLinks) && (book.authors))
				resp.forEach(a => {
						let filter = this.props.books.filter(h => h.id === a.id);
						if(filter[0]){
							a.shelf = filter[0].shelf;
						}
					})
				 this.setState({ booksSearch: resp });
			}
		})
	}
	render() {
		return(
		  <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                	type="text"
                	placeholder="Search by title or author"
                	value={this.state.query}
                	onChange={e => {
                		this.updateQuery(e.target.value);
                	}}
            	/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
              	this.state.query && this.state.booksSearch.map((book) => (
              		<Books books={book} key={book.id} moveShelf={this.props.moveShelf}/>
          		))
              }
              </ol>
            </div>
          </div>
		);
	}
}

export default SearchPage;
