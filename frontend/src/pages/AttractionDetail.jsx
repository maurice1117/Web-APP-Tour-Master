import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css";

const AttractionDetail = () => {
  const { name } = useParams(); // URL 中的 attraction 名稱
  const [details, setDetails] = useState(null);

  // 檢查 localStorage 是否已有保存的資料
  useEffect(() => {
    const savedDetails = localStorage.getItem(name);
    if (savedDetails) {
      setDetails(JSON.parse(savedDetails)); // 如果有直接使用已保存的資料
    } else {
      // 如果沒有保存的資料，就呼叫 API
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
          // 儲存到 localStorage 中
          localStorage.setItem(name, JSON.stringify(result.data));
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      };
      fetchDetails();
    }
  }, [name]);

  const getDatails = () => {
    console.log(name);
    console.log(details);
  }

  return (
    <div>
      <Bar />
      {details ? (
        <div>
          <button onClick={getDatails}>看看</button>
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
