import React from 'react';
import './Card.css';

const Card = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <img 
        src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png'} 
        alt={book.volumeInfo.title} 
        className="book-cover" 
      />
      <h3 className="book-title">{book.volumeInfo.title}</h3>
      <p className="book-author">by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
      <p className="book-genre">Genre: {book.volumeInfo.categories?.join(', ') || 'Unknown Genre'}</p>
    </div>
  );
};

export default Card;
