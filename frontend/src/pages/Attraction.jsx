import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Bar from "../components/Bar";
import api from "../api";

const Attraction = () => {
  const [localSearchData, setLocalSearchData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (storedSearchData && storedSearchData.status === 'success') {
      setLocalSearchData(storedSearchData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  const createLocation = (attraction, index) => {
    const confirmAddToFavorites = window.confirm(`Do you want to add "${attraction}" to your favorite locations?`);
    if (confirmAddToFavorites) {
      const place = attraction;
      const description = localSearchData.introductions[index];
      const photo1 = localSearchData.images1[index] || "";
      const photo2 = localSearchData.images2[index] || "";
      const photo3 = localSearchData.images3[index] || "";

      api
        .post("/api/locations/", { place, description, photo1, photo2, photo3 })
        .then((res) => {
          if (res.status === 201) {
            alert(`${attraction} added to favorites!`);
            const updatedFavorites = [...favorites, attraction];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
    const handleStorageChange = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);

    loadFavorites();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Bar />
      
      <h1 className="search-title">🔄搜尋結果</h1>
      {localSearchData && localSearchData.status === 'success' && (
        <div className="attraction-grid">
          {localSearchData.attractions.map((attraction, index) => (
            <div key={index} className="attraction-block">
              <h4>{attraction}</h4>
              <img src={localSearchData.images1[index]} alt={attraction} width="200" />
              <button
                onClick={() => createLocation(attraction, index)}
                disabled={favorites.includes(attraction)}
              >
                {favorites.includes(attraction) ? '💖' : '🤍'}
              </button>
              <Link to={`/attraction/${index}`}>
              <button className="view-more-button">View More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attraction;
