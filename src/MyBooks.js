import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";

class MyBooks extends Component {
  // state = {
  //   books: this.props.books
  // };

  render() {
    const {
      currentlyReading,
      wantToRead,
      read,
      updateRemoteShelves
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* CURRENTLY READING BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                Currently Reading ({this.props.currentlyReading.length})
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => {
                    return (
                      <Book
                        key={book.id}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        // When BookDetails is open from Book,
                        // Book sends the id of the book selected to the parent component,
                        // which then sends it to App (needed to get the path to BookDetails)
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        id={book.id}
                        shelf={book.shelf}
                        img={
                          book.imageLinks ? book.imageLinks.smallThumbnail : ""
                        }
                        title={book.title}
                        author={book.authors}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
            {/* WANT TO READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                Want to Read ({this.props.wantToRead.length})
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => {
                    return (
                      <Book
                        key={book.id}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        id={book.id}
                        shelf={book.shelf}
                        img={
                          book.imageLinks ? book.imageLinks.smallThumbnail : ""
                        }
                        title={book.title}
                        author={book.authors}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
            {/* READ BOOKS */}
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                Read ({this.props.read.length})
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => {
                    return (
                      <Book
                        key={book.id}
                        onUpdateRemoteShelves={(book, shelf) =>
                          updateRemoteShelves(book, shelf)
                        }
                        onSendBookId={id => {
                          this.props.getBookId(id);
                        }}
                        id={book.id}
                        shelf={book.shelf}
                        img={
                          book.imageLinks ? book.imageLinks.smallThumbnail : ""
                        }
                        title={book.title}
                        author={book.authors}
                      />
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooks;
