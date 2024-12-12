import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/FavoriteDetail.css";
import "../styles/AttractionDetail.css";
import "../styles/Detail.css";
import Bar from "../components/Bar";
import api from "../api";

function FavoriteDetail() {
    const { index } = useParams(); // 獲取 URL 中的 index 參數
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLocationDetail();
    }, [index]);

    const getLocationDetail = () => {
        api
            .get("/api/locations/")
            .then((res) => res.data)
            .then((data) => {
                const selectedLocation = data.find((l) => l.id === parseInt(index));
                setLocation(selectedLocation);
            })
            .catch((err) => alert(err));
    };

    const deleteLocationDetail = (id, place) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (confirmDelete) {
            
            api
                .delete(`/api/locations/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Location deleted!");

                        const storedLocations = JSON.parse(localStorage.getItem("favorites")) || [];
                        const updatedLocations = storedLocations.filter(
                            (loc) => loc.trim().toLowerCase() !== place.trim().toLowerCase()
                        );
                        localStorage.setItem("favorites", JSON.stringify(updatedLocations));

                        navigate("/favorite");
                    } else {
                        alert("Failed to delete location.");
                    }
                })
                .catch((error) => alert(error));
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
            {location ? (
                <div className="detail-container">
                    {/* 新增刪除按鈕 */}
                    <button className="delete-button-detail" onClick={() => deleteLocationDetail(location.id, location.place)}>
                        Delete Location
                    </button>
                    
                    <h2 className="detail-header">{location.place}</h2>

                    {(() => {
                        const [firstPart, secondPart] = splitText(location.description);
                        return (
                        <>
                            <p className="detail-text">{firstPart}</p>
                            {location.photo1 && (
                            <img
                                src={location.photo1}
                                className="detail-image"
                                alt="Image 1"
                                onError={(e) => (e.target.style.display = 'none')}
                            />
                            )}
                            <p className="detail-text">{secondPart}</p>
                        </>
                        );
                    })()}

                    <div className="detail-image-group">
                        {location.photo2 && (
                        <img
                            src={location.photo2}
                            alt="Image 2"
                            onError={(e) => (e.target.style.display = 'none')}
                        />
                        )}
                        {location.photo3 && (
                        <img
                            src={location.photo3}
                            alt="Image 3"
                            onError={(e) => (e.target.style.display = 'none')}
                        />
                        )}
                    </div>
                    <p className="create-time">Created on: {new Date(location.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default FavoriteDetail;
