import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchGlobalContext } from '../components/SearchGlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";
import api from "../api";

const Attraction = () => {
  const { searchData } = useContext(SearchGlobalContext);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchData || searchData.status !== 'success') {
      // go back to home
      navigate('/');
    }
  }, [searchData, navigate]);

  // what is this 0.0
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };


  const createLocation = (attraction, index) => {
    const confirmAddToFavorites = window.confirm(`Do you want to add "${attraction}" to your favorite locations?`);
  
    if (confirmAddToFavorites) {
      const place = attraction;
      const description = searchData.description[index];
      const photo1 = searchData.images1[index] || "";
      const photo2 = searchData.images2[index] || "";
      const photo3 = searchData.images3[index] || "";
  
      console.log({ place, description, photo1, photo2, photo3 });
  
      api
        .post("/api/locations/", { place, description, photo1, photo2, photo3 })
        .then((res) => {
          if (res.status === 201) {
            alert(`${attraction} added to favorites!`);
            const updatedFavorites = [...favorites, attraction];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // 儲存至 localStorage
          } else {
            alert('Failed to create location.');
          }
        })
        .catch((err) => {
          alert('Error creating location');
          console.error('Error details:', err.response ? err.response.data : err);
        });
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div>
      <Bar />
      <h1>Attraction Page</h1>
      {searchData && searchData.status === 'success' && (
        <div className="attraction-grid">
          {searchData.attractions.map((attraction, index) => (
            <div key={index} className="attraction-block">
              <h4>{attraction}</h4>
              <img src={searchData.images1[index]} alt={attraction} width="200" />
              <button
                onClick={() => createLocation(attraction, index)}
                disabled={favorites.includes(attraction)} // 禁用已經加入的景點
              >
                {favorites.includes(attraction) ? '💖' : '🤍'}
              </button>
              <Link to={`/attraction/${index}`}>
                <button>View More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attraction;