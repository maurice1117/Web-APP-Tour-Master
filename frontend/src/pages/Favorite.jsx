import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Bar from "../components/Bar";
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

    const deleteLocation = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (confirmDelete) {
            api
                .delete(`/api/locations/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Location deleted!");
                    } else {
                        alert("Failed to delete location.");
                    }
                    getLocation();
                })
                .catch((error) => alert(error));
        }
    };

    return (
        <div>
            <Bar />
            <h1>Favorite Locations</h1>
            <div className="favorite-grid">
                {locations.map((location) => (
                    <div key={location.id} className="favorite-item">
                        <h3>{location.place}</h3>
                        <img
                            src={location.photo1}
                            alt={location.place}
                            style={{ width: "200px", height: "auto" }}
                        />
                        <p>Created on: {new Date(location.created_at).toLocaleDateString()}</p>
                        <button onClick={() => deleteLocation(location.id)}>Delete</button>
                        <Link to={`/favorite/${location.id}`}>
                            <button>View More</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorite;
