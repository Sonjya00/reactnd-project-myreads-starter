import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  state = {
    shelf: ""
  };

  // Fetch the get API to include the info about the current shelf
  // Needed to display the correct shelf value on the selector immediately.
  componentDidMount() {
    BooksAPI.get(this.props.id).then(data => {
      this.setState({
        shelf: data.shelf
      });
    });
  }

  // When the book changes shelf, call onUpdateRemoteShelves on either
  // MyBooks or SearchBooks and send the new data
  handleChangeShelf = event => {
    this.setState({
      shelf: event.target.value
    });
    this.props.onUpdateRemoteShelves(this.props, event.target.value);
  };

  // Upon opening BookDetails, send the book id to MyBooks or SearchBooks,
  // which will then send it to App.
  // Then store the id to the localStorage (or Bookdetails will lose this data
  // upon refresh).
  handleClick = id => {
    id = this.props.id;
    localStorage.setItem("bookId", JSON.stringify(id));
  };

  render() {
    const { authors, id, img, title, handleData } = this.props;
    const { shelf } = this.state;
    // const used to get the right path to the BookDetails page
    const path = `/details/${id}`;
    return (
      <li className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${img})`
            }}
          >
            {!img && (
              <span className="book-cover--alt">Image not available</span>
            )}
          </div>
          <div className="book-shelf-changer--g">
            <select
              id={id}
              value={shelf}
              onChange={this.handleChangeShelf}
              aria-label="Select shelf"
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          <Link to={path} onClick={this.handleClick} className="link">
            {title}
          </Link>
        </div>
        <div className="book-authors">{handleData(authors)}</div>
      </li>
    );
  }
}

Book.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.array,
  onUpdateRemoteShelves: PropTypes.func,
  handleData: PropTypes.func
};

export default Book;
