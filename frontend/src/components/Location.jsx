import React from "react";
import "../styles/Location.css";

function Location({ location, onDelete }) {
    const formattedDate = new Date(location.created_at).toLocaleDateString("zh-TW");

    return (
        <div className="location-container">
            <h2 className="location-place">{location.place}</h2>
            <p className="location-description">{location.description}</p>
            <div className="location-photos">
                {location.photo1 && <img src={location.photo1} alt={`${location.place} photo 1`} className="location-photo" />}
                {location.photo2 && <img src={location.photo2} alt={`${location.place} photo 2`} className="location-photo" />}
                {location.photo3 && <img src={location.photo3} alt={`${location.place} photo 3`} className="location-photo" />}
            </div>
            <p className="location-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(location.id)}>
                Delete
            </button>
        </div>
    );
}

export default Location;
