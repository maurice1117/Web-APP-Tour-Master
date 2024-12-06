import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css";

const AttractionDetail = () => {
  const { index } = useParams(); // URL 中的 index
  const [localSearchData, setLocalSearchData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearchData = JSON.parse(localStorage.getItem('searchData'));
    if (storedSearchData && storedSearchData.status === 'success') {
      setLocalSearchData(storedSearchData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <Bar />
      {localSearchData ? (
        <div className="attraction-detail">
          <h2>Introduction</h2>
          <p>{localSearchData.introductions[index]}</p>
          <h2>Attractions</h2>
          <p>{localSearchData.attractions[index]}</p>
          <h2>Images</h2>
          <img
            src={localSearchData.images1[index]}
            style={{ height: "200px" }}
            alt="Image 1"
          />
          <img
            src={localSearchData.images2[index]}
            style={{ height: "200px" }}
            alt="Image 2"
          />
          <img
            src={localSearchData.images3[index]}
            style={{ height: "200px" }}
            alt="Image 3"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;
