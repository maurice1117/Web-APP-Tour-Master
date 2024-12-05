import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { SearchGlobalContext } from '../components/SearchGlobalContext';
import Bar from "../components/Bar";
import "../styles/AttractionDetail.css";

const AttractionDetail = () => {
  const { index } = useParams(); // URL 中的 index
  const { searchData } = useContext(SearchGlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchData || searchData.status !== 'success') {
      // go back to home
      navigate('/');
    }
  }, [searchData, navigate]);

  return (
    <div>
      <Bar />
      {searchData ? (
        <div className="attraction-detail">
          <h2>introduction</h2>
          <p>{searchData.introductions[index]}</p>
          <h2>attractions</h2>
          <p>{searchData.attractions[index]}</p>
          <h2>images</h2>
          <img src={searchData.images1[index]} style={{ height: "200px" }}/>
          <img src={searchData.images2[index]} style={{ height: "200px" }}/>
          <img src={searchData.images3[index]} style={{ height: "200px" }}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AttractionDetail;
