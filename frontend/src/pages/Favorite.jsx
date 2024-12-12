import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Bar from "../components/Bar";
import Jake_the_Dog from '../../assets/Jake the Dog.jpg';
import car_drive from '../../assets/car_drive.jpg';
import "../styles/Favorite.css";

function Favorite() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        api
            .get("/api/locations/")
            .then((res) => res.data)
            .then((data) => {
                setLocations(data);
            })
            .catch((err) => alert(err));
    };

    const deleteLocation = (id, place) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (confirmDelete) {
            api
                .delete(`/api/locations/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Location deleted!");

                        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
                        const updatedFavorites = storedFavorites.filter(
                                (favorite) => favorite.trim().toLowerCase() !== place.trim().toLowerCase()
                            );
                        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

                        getLocation();
                    } else {
                        alert("Failed to delete location.");
                    }
                })
                .catch((error) => alert(error));
        }
    };

    return (
        <div>
            <Bar />
            <img 
                src={car_drive} 
                alt="Topic-image"
                className="Topic-image" />
            <h1 className="Topic-text">Favorite Locations</h1>
            <p className="Topic-content">There are your favorite location.</p>
            <p className="Topic-content">Click on the image to get the details.</p>
            <div className="favorite-grid">
                {locations.map((location) => (
                    <div key={location.id} className="favorite-item">
                        {/* 圖片覆蓋 View More 按鈕 */}
                        <Link to={`/favorite/${location.id}`}>
                            <img
                                src={location.photo1}
                                alt={location.place}
                                className="favorite-image"
                                onError={(e) => (e.target.src = location.photo2 || location.photo3 || "../../assets/car_drive.jpg")}
                            />
                        </Link>
                        <div className="favorite-content">
                            <h3 className="favorite-title">{location.place}</h3>
                            <p className="favorite-date">
                                Created time: {new Date(location.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        {/* Delete Button 位於右下角 */}
                        <button
                            onClick={() => deleteLocation(location.id, location.place)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorite;
