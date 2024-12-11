import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Bar from "../components/Bar";
import api from "../api";
import "../styles/AttractionDetail.css";
import LoadingIndicator from "../components/LoadingIndicator";

const Attraction = () => {
  const [localSearchData, setLocalSearchData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchData = JSON.parse(localStorage.getItem("searchData"));
    if (storedSearchData && storedSearchData.status === "success") {
      setLocalSearchData(storedSearchData);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  const createLocation = (attraction, index) => {
    const confirmAddToFavorites = window.confirm(
      `Do you want to add "${attraction}" to your favorite locations?`
    );
    if (confirmAddToFavorites) {
      const place = attraction;
      const description = localSearchData.attractions[index].introduction;
      const photo1 = localSearchData.attractions[index].images[0] || "";
      const photo2 = localSearchData.attractions[index].images[1] || "";
      const photo3 = localSearchData.attractions[index].images[2] || "";

      api
        .post("/api/locations/", { place, description, photo1, photo2, photo3 })
        .then((res) => {
          if (res.status === 201) {
            alert(`${attraction} added to favorites!`);
            const updatedFavorites = [...favorites, attraction];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          } else {
            alert("Failed to create location.");
          }
        })
        .catch((err) => {
          alert("Error creating location");
          console.error("Error details:", err.response ? err.response.data : err);
        });
    }
  };

  const searchAgain = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/search/location`,
        {
          location: localSearchData.location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log(result.data);
      localStorage.setItem("searchData", JSON.stringify(result.data));
      window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
    };

    window.addEventListener("storage", handleStorageChange);

    loadFavorites();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Bar />

      {localSearchData && localSearchData.location && (
        <h1 className="search-title">{localSearchData.location} 附近的景點</h1>
      )}
      <div className="button-container">
      <button onClick={searchAgain} className="search-again-button">
        🔄 重新搜尋
      </button>
      </div>
        
      {isLoading && (
        <div className="loading-container">
          {isLoading && <LoadingIndicator />}
        </div>
      )}

      {localSearchData && localSearchData.status === "success" && (
        <div className="attraction-grid">
          {localSearchData.attractions.map((attraction, index) => (
            <div key={index} className="attraction-block">
              <h4>{attraction.name}</h4>
              <img
                src={attraction.images[0]}
                alt={attraction.name}
                onError={(e) => (e.target.src = attraction.images[1])}
                width="200"
              />
              <button
                onClick={() => createLocation(attraction.name, index)}
                disabled={favorites.includes(attraction.name)}
                className={`favorite-button ${favorites.includes(attraction.name) ? "active" : ""}`}
              >
                {favorites.includes(attraction.name) ? "💖" : "🤍"}
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


