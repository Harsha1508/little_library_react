import React, { useState, useEffect } from 'react';
import './Home.css'; 
import Card from '../Card/Card'; // Import the Card component

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=the');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data && data.items && data.items.length > 0) {
          setFeaturedBooks(data.items.slice(0, 5)); 
        } else {
          throw new Error('No books found');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  if (loading) {
    return <div className="homepage-container">Loading...</div>;
  }

  if (error) {
    return <div className="homepage-container">Error: {error}</div>;
  }

  return (
    <div className="homepage-container">
      <div className="intro-section">
        <h1 className="intro-title">Welcome to Little Library!</h1>
        <p className="intro-text">
          Dive into a world of endless stories and adventures. Explore, discover, and read your favorite books for free!
        </p>
      </div>

      <div className="featured-section">
        <h2 className="featured-title">Featured Books</h2>
        <div className="featured-books-list">
          {featuredBooks.map((book, index) => (
            <Card key={index} book={book} />  // Using the Card component here
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
