import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css";

const AttractionDetail = () => {
  const { index } = useParams(); // URL 中的 index
  const [response, setResponse] = useState(null);

  const checkResponseFile = async () => {
    try {
      const result = await axios.get('/src/assets/response.json', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setResponse(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('response.json not found');
        setResponse(null);
      } else {
        console.error('Error loading response.json:', error);
      }
    }
  };

  useEffect(() => {
    checkResponseFile();
  }, []);

  return (
    <div>
      <Bar />
      {response ? (
        <div className="attraction-detail">
          <h2>introduction</h2>
          <p>{response.description[index]}</p>
          <h2>attractions</h2>
          <p>{response.attractions[index]}</p>
          <h2>images</h2>
          <img src={response.images1[index]} style={{ height: "200px" }}/>
          <img src={response.images2[index]} style={{ height: "200px" }}/>
          <img src={response.images3[index]} style={{ height: "200px" }}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;
