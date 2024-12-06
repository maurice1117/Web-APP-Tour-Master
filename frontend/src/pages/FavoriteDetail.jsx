import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
                const selectedLocation = data.find(l => l.id === parseInt(index));
                setLocation(selectedLocation);
            })
            .catch((err) => alert(err));
    };

    const deleteLocationDetail = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");
        if (confirmDelete) {
            api
                .delete(`/api/locations/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        alert("Location deleted!");
                        navigate("/favorite");
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
            {location ? (
                <div className="favorite-detail">

                    {/* 新增刪除按鈕 */}
                    <button onClick={() => deleteLocationDetail(location.id)}>Delete Location</button>

                    <h2>{location.place}</h2>
                    <p>{location.description}</p>
                    <h3>Images:</h3>
                    <img
                        src={location.photo1}
                        alt={location.place}
                        style={{ width: "300px", height: "auto" }}
                    />
                    <img
                        src={location.photo2}
                        alt={location.place}
                        style={{ width: "300px", height: "auto" }}
                    />
                    <img
                        src={location.photo3}
                        alt={location.place}
                        style={{ width: "300px", height: "auto" }}
                    />
                    <p>Created on: {new Date(location.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default FavoriteDetail;
