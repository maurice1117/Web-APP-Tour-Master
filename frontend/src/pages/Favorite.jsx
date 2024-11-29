import { useState, useEffect } from "react";
import api from "../api";
import Location from "../components/Location";
import "../styles/Favorite.css";

function Favorite() {
    const [locations, setLocations] = useState([]);
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState("");
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [photo3, setPhoto3] = useState("");

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

    const createLocation = (e) => {
        e.preventDefault();
        api
            .post("/api/locations/", { place, description, photo1, photo2, photo3 })
            .then((res) => {
                if (res.status === 201) {
                    alert("Location created!");
                    setPlace("");
                    setDescription("");
                    setPhoto1("");
                    setPhoto2("");
                    setPhoto3("");
                    getLocation();
                } else {
                    alert("Failed to create location.");
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h1>Favorite Locations</h1>
                {locations.map((location) => (
                    <Location location={location} onDelete={deleteLocation} key={location.id} />
                ))}
            </div>
            <h2>Create a Location</h2>
            <form onSubmit={createLocation}>
                <label htmlFor="place">Place:</label>
                <br />
                <input
                    type="text"
                    id="place"
                    name="place"
                    required
                    onChange={(e) => setPlace(e.target.value)}
                    value={place}
                />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="photo1">Photo 1 URL:</label>
                <br />
                <input
                    type="url"
                    id="photo1"
                    name="photo1"
                    value={photo1}
                    onChange={(e) => setPhoto1(e.target.value)}
                />
                <br />
                <label htmlFor="photo2">Photo 2 URL:</label>
                <br />
                <input
                    type="url"
                    id="photo2"
                    name="photo2"
                    value={photo2}
                    onChange={(e) => setPhoto2(e.target.value)}
                />
                <br />
                <label htmlFor="photo3">Photo 3 URL:</label>
                <br />
                <input
                    type="url"
                    id="photo3"
                    name="photo3"
                    value={photo3}
                    onChange={(e) => setPhoto3(e.target.value)}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Favorite;
