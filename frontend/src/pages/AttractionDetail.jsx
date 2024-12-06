import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css";
import api from '../api';

const AttractionDetail = () => {
  const { index } = useParams(); // URL 中的 index
  const [localSearchData, setLocalSearchData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (storedSearchData && storedSearchData.status === 'success') {
      setLocalSearchData(storedSearchData);
    } else {
      navigate('/');
    }

    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, [navigate]);

  const createLocation = (attraction) => {
    const confirmAddToFavorites = window.confirm(`Do you want to add "${attraction}" to your favorite locations?`);
    if (confirmAddToFavorites) {
      setIsSaving(true);
      const description = localSearchData.introductions[index];
      const photo1 = localSearchData.images1[index] || "";
      const photo2 = localSearchData.images2[index] || "";
      const photo3 = localSearchData.images3[index] || "";

      api
        .post("/api/locations/", { place: attraction, description, photo1, photo2, photo3 })
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
        })
        .finally(() => {
          setIsSaving(false);
        });
    }
  };

  return (
    <div>
      <Bar />
      {localSearchData ? (
        <div className="attraction-detail">

          {/* 顯示愛心圖示，並禁用已收藏的愛心 */}
          <button
            onClick={() => !favorites.includes(localSearchData.attractions[index]) && createLocation(localSearchData.attractions[index])}
            disabled={favorites.includes(localSearchData.attractions[index]) || isSaving} // 如果已經收藏或正在保存則禁用
          >
            {favorites.includes(localSearchData.attractions[index]) ? '💖' : '🤍'}
          </button>

          <h2>Introduction</h2>
          <p>{localSearchData.introductions[index]}</p>
          <h2>Attractions</h2>
          <p>{localSearchData.attractions[index]}</p>
          <h2>Images</h2>
          <img
            src={localSearchData.images1[index]}
            style={{ height: "200px" }}
            alt="Image 1"
          />
          <img
            src={localSearchData.images2[index]}
            style={{ height: "200px" }}
            alt="Image 2"
          />
          <img
            src={localSearchData.images3[index]}
            style={{ height: "200px" }}
            alt="Image 3"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;
