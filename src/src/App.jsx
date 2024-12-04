import React from "react";
import { useNavigate } from "react-router-dom"; // 引入 React Router 的跳轉功能
import "./App.css";

// Header 組件
const Header = () => {
  const navigate = useNavigate(); // 跳轉函數

  const handleSearch = () => {
    navigate("/place"); // 搜索按鈕點擊後跳轉到 place 頁面
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul>
          <li><a href="/">主頁</a></li>
          <li><a href="#logout">登出</a></li>
          <li><a href="#favorites">我的最愛</a></li>
          <li><a href="#favorites">關於我們</a></li>
          <li><a href="#account">個人帳號</a></li>
        </ul>
      </nav>
      <div className="hero-content">
        <h1>世界很大，去探索你的故事！</h1>
        <div className="search-bar">
          <div className="input-wrapper">
            <span className="icon-location">📍</span>
            <input type="text" placeholder="輸入地點名稱" />
          </div>
          <button className="search-button" onClick={handleSearch}>
            <span className="icon-search">🔍</span> 搜尋附近景點
          </button>
        </div>
      </div>
    </header>
  );
};

// FeaturedSection 組件
const FeaturedSection = () => {
  return (
    <section className="featured-section">
      <div className="featured-images">
        <img
          className="liberty-image"
          src="https://i.postimg.cc/Nftg6kKt/2024-11-22-7-32-11.png"
          alt="Statue of Liberty"
        />
        <img
          className="arc-image"
          src="https://i.postimg.cc/4ykXFzwz/2024-11-22-7-32-22.png"
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
  );
};

// DestinationCard 組件
const DestinationCard = ({ name, country, image }) => {
  return (
    <div className="destination-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{country}</p>
    </div>
  );
};

// DestinationGrid 組件
const DestinationGrid = () => {
  const destinations = [
    { id: 1, name: "大峽谷國家公園", country: "美國", image: "https://i.postimg.cc/J7jGbn4f/2024-11-22-6-14-32.png" },
    { id: 2, name: "峇里島", country: "印尼", image: "https://i.postimg.cc/zv47ZG4Z/2024-11-22-6-14-55.png" },
    { id: 3, name: "釜山觀光列車", country: "南韓", image: "https://i.postimg.cc/W3H6g4NF/2024-11-22-6-24-24.png" },
    { id: 4, name: "馬丘比丘", country: "秘魯", image: "https://i.postimg.cc/QdvFQW1r/2024-11-22-6-25-25.png" },
    { id: 5, name: "布達佩斯國會大廈", country: "匈牙利", image: "https://i.postimg.cc/jdz30zqM/HG-272655443.jpg" },
    { id: 6, name: "倫敦塔橋", country: "英國", image: "https://i.postimg.cc/FsskNvNw/2024-11-22-6-25-37.png" },
  ];

  return (
    <section className="destination-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          name={destination.name}
          country={destination.country}
          image={destination.image}
        />
      ))}
    </section>
  );
};

// App 主組件
const App = () => {
  return (
    <div className="app">
      <Header />
      <FeaturedSection />
      <h2>探索世界著名景點</h2>
      <DestinationGrid />
    </div>
  );
};

export default App;


