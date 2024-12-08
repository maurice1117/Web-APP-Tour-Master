import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";
import "../styles/Home.css"; // 引入 Home.css

const Home = () => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post('http://127.0.0.1:8000/search/location', {
        location: location,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(result.data);
      localStorage.setItem('searchData', JSON.stringify(result.data));
      navigate('/attraction');
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Bar />
      <header className="header">
        <nav className="navbar">
          <ul>
          
          </ul>
        </nav>
        <div className="hero-content">
          <h1>世界很大，去探索你的故事！</h1>
          <div className="search-bar">
            <div className="input-wrapper">
              <span className="icon-location">📍</span>
              <input
                type="text"
                value={location}
                onChange={handleInputChange}
                placeholder="輸入地點名稱"
              />
            </div>
            <button className="search-button" onClick={handleSearch}>
              <span className="icon-search">🔍</span> 搜尋附近景點
            </button>
          </div>
          {isLoading && <p>Loading...</p>}
        </div>
      </header>

      {/* 中間特色區塊恢復原本排版 */}
      <section className="featured-section">
        <div className="featured-images">
          <img
            className="liberty-image"
            src="../../assets/home_img7.png"
            alt="Statue of Liberty"
          />
          <img
            className="arc-image"
            src="../../assets/home_img8.png"
            alt="Arc de Triomphe"
          />
        </div>
        <div className="featured-content">
          <h2>一鍵搜尋，發現你的夢想之地</h2>
          <p>
            只需輸入地點名稱，我們會為你推薦附近的熱門景點、活動與必玩清單，
            讓你的旅行計畫更輕鬆！
          </p>
          <div className="stats-group">
            <div>
              <h2 style={{ color: "#006400" }}>200+</h2>
              <p>必訪景點</p>
            </div>
            <div>
              <h2 style={{ color: "#006400" }}>50+</h2>
              <p>推薦行程規劃</p>
            </div>
            <div>
              <h2 style={{ color: "#006400" }}>1000+</h2>
              <p>用戶真實評價</p>
            </div>
            <div>
              <h2 style={{ color: "#006400" }}>50000+</h2>
              <p>旅行者的選擇</p>
            </div>
          </div>
        </div>
      </section>

      {/* 景點展示網格區塊 */}
      <section className="destination-grid">
        <h2>探索世界著名景點</h2>
        <div className="grid">
          <div className="destination-card">
            <img
              src="../../assets/home_img1.png"
              alt="大峽谷國家公園"
            />
            <h3>大峽谷國家公園</h3>
            <p>美國</p>
          </div>
          <div className="destination-card">
            <img
              src="../../assets/home_img2.png"
              alt="峇里島"
            />
            <h3>峇里島</h3>
            <p>印尼</p>
          </div>
          <div className="destination-card">
            <img
              src="../../assets/home_img3.png"
              alt="釜山觀光列車"
            />
            <h3>釜山觀光列車</h3>
            <p>南韓</p>
          </div>
          <div className="destination-card">
            <img
              src="../../assets/home_img4.png"
              alt="馬丘比丘"
            />
            <h3>馬丘比丘</h3>
            <p>秘魯</p>
          </div>
          <div className="destination-card">
            <img
              src="../../assets/home_img5.jpg"
              alt="布達佩斯國會大廈"
            />
            <h3>布達佩斯國會大廈</h3>
            <p>匈牙利</p>
          </div>
          <div className="destination-card">
            <img
              src="../../assets/home_img6.png"
              alt="倫敦塔橋"
            />
            <h3>倫敦塔橋</h3>
            <p>英國</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

