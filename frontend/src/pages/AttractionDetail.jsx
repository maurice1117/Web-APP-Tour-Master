import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css"

const AttractionDetail = () => {
  const { name } = useParams(); // 取得 URL 中的 attraction 名稱
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await axios.post('http://127.0.0.1:8000/search/attraction', {
          attraction: name
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setDetails(result.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [name]);

  return (
    <div>
      <Bar />
      {details ? (
        <div>
          <h2>{name}</h2>
          <h3>Introduction:</h3>
          <p>{details.introduction}</p>
          <h3>Images:</h3>
          <div>
            {details.images.map((img, idx) => (
              <img key={idx} src={img} alt={name} width="200" />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;