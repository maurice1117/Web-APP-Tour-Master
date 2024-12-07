import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Bar from "../components/Bar";
import "../styles/detail.css";
import "../styles/AttractionDetail.css";
import api from '../api';

const AttractionDetail = () => {
  const { index } = useParams();
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

  const splitText = (text) => {
    if (!text) return ["", ""];
    const sentences = text.split(/(?<=[。！？\.\!\?])/g); // 按標點分割
    if (sentences.length <= 1) return [text, ""];

    let firstPart = "";
    let secondPart = "";

    let charCount = 0;
    const mid = Math.ceil(text.length / 2);
    for (let i = 0; i < sentences.length; i++) {
      if (charCount + sentences[i].length <= mid) {
        firstPart += sentences[i];
        charCount += sentences[i].length;
      } else {
        secondPart += sentences[i];
      }
    }

    return [firstPart.trim(), secondPart.trim()];
  };

  return (
    <div>
      <Bar />
      {localSearchData ? (
        <div className="detail-container">
          <button
            className="favorite-button"
            onClick={() => !favorites.includes(localSearchData.attractions[index]) && createLocation(localSearchData.attractions[index])}
            disabled={favorites.includes(localSearchData.attractions[index]) || isSaving}
          >
            {favorites.includes(localSearchData.attractions[index]) ? '💖 Added' : '🤍 Add to Favorites'}
          </button>

          <h2 className="detail-header">景點介紹</h2>
          <p className="detail-text">{localSearchData.attractions[index]}</p>

          {/* 分割文字 */}
          {(() => {
            const [firstPart, secondPart] = splitText(localSearchData.introductions[index]);
            return (
              <>
                <p className="detail-text">{firstPart}</p>
                <img
                  src={localSearchData.images1[index]}
                  className="detail-image"
                  alt="Image 1"
                />
                <p className="detail-text">{secondPart}</p>
              </>
            );
          })()}

          {/* 兩張並排照片 */}
          <div className="detail-image-group">
            <img
              src={localSearchData.images2[index]}
              alt="Image 2"
            />
            <img
              src={localSearchData.images3[index]}
              alt="Image 3"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;
