import { useState, useEffect } from "react";
import api from "../api";
import Location from "../components/Location";
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
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteLocation = (id) => {
        api
            .delete(`/api/locations/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Location deleted!");
                else alert("Failed to delete location.");
                getLocation();
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <Bar/>
            <div>
                <h1>Favorite Locations</h1>
                {locations.map((location) => (
                    <Location location={location} onDelete={deleteLocation} key={location.id} />
                ))}
            </div>
        </div>
    );
}

export default Favorite;
