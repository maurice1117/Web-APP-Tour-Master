import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import "../styles/detail.css";
import "../styles/AttractionDetail.css";
import api from '../api';

const AttractionDetail = () => {
  const { index } = useParams();
  const { pathname } = useLocation();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const createLocation = (attraction) => {
    const confirmAddToFavorites = window.confirm(`Do you want to add "${attraction}" to your favorite locations?`);
    if (confirmAddToFavorites) {
      setIsSaving(true);
      const description = localSearchData.attractions[index].introduction;
      const photo1 = localSearchData.attractions[index].images[0] || "";
      const photo2 = localSearchData.attractions[index].images[1] || "";
      const photo3 = localSearchData.attractions[index].images[2] || "";

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
    const sentences = text.split(/([。！？\.\!\?])/g).reduce((acc, cur, index) => {
      if (index % 2 === 0) {
          acc.push(cur);
      } else {
          acc[acc.length - 1] += cur;
      }
      return acc;
    }, []);
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
          <div className="button-container">
            <Link to={`/attraction`}>
              <button className="back-button">&laquo;</button>
            </Link>

            <button
              className="favorite-button-detail"
              onClick={() => !favorites.includes(localSearchData.attractions[index].name) && createLocation(localSearchData.attractions[index].name)}
              disabled={favorites.includes(localSearchData.attractions[index].name) || isSaving}
            >
              {favorites.includes(localSearchData.attractions[index].name) ? '💖 Added' : '🤍 Add to Favorites'}
            </button>
          </div>

          <h2 className="detail-header">{localSearchData.attractions[index].name}</h2>

          {/* 分割文字 */}
          {(() => {
            const [firstPart, secondPart] = splitText(localSearchData.attractions[index].introduction);
            return (
              <>
                <p className="detail-text">{firstPart}</p>
                {localSearchData.attractions[index].images[0] && (
                  <img
                    src={localSearchData.attractions[index].images[0]}
                    className="detail-image"
                    alt="Image 1"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
                <p className="detail-text">{secondPart}</p>
              </>
            );
          })()}

          {/* 兩張並排照片 */}
          <div className="detail-image-group">
            {localSearchData.attractions[index].images[1] && (
              <img
                src={localSearchData.attractions[index].images[1]}
                alt="Image 2"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            {localSearchData.attractions[index].images[2] && (
              <img
                src={localSearchData.attractions[index].images[2]}
                alt="Image 3"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
      {/* show other attraction */}
      <div className="other-attraction-container">
        <h3 className="detail-header">周邊景點</h3>
        {localSearchData && localSearchData.status === "success" && (
          <div className="other-attraction-grid">
            {(() => {
              const startId = (Number(index)+1) % 9;
              const endId = (Number(index)+5) % 9;
              
              let attractions_show_aside;

              if(startId < endId){
                attractions_show_aside = localSearchData.attractions.slice(startId, endId);
              }
              else{
                attractions_show_aside = [
                  ...localSearchData.attractions.slice(startId, 9),
                  ...localSearchData.attractions.slice(0, endId),
                ];
              }
              return attractions_show_aside.map((attraction, idx) => (
                <div key={idx} className="attraction-block">
                  <h4>{attraction.name}</h4>
                  <img
                    src={attraction.images[0]}
                    alt={attraction.name}
                    onError={(e) => (e.target.src = attraction.images[1])}
                  />
                  <Link to={`/attraction/${(Number(index) + 1 + Number(idx)) % 9}`}>
                    <button className="view-more-button">View More</button>
                  </Link>
                </div>
              ));
            })()}
          </div>
        )}

      </div>
    </div>
  );
};

export default AttractionDetail;
