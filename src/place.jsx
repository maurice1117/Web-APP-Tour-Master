import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./place.css";

const mockApiData = [
  {
    id: 1,
    title: "Where can I go? 5 amazing countries",
    description: "5 amazing countries that are open right now",
    date: "September 19, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Beautiful beaches to visit",
    description: "Relax at the most serene beaches",
    date: "September 21, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "10 Indonesian Destinations",
    description: "10 Indonesian Destinations you should visit",
    date: "September 19, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Amazing mountain views",
    description: "Explore the mountains and valleys",
    date: "September 20, 2022",
    image: "https://via.placeholder.com/300x200",
  },
];

const Place = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(new Set()); // 儲存已點擊愛心的 ID
  const navigate = useNavigate();

  // 模擬 API 數據請求
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模擬延遲
      setData(mockApiData);
    };
    fetchData();
  }, []);

  // 跳轉到詳細頁面
  const handleViewMore = (id) => {
    navigate(`/detail/${id}`);
  };

  // 點擊愛心按鈕
  const handleFavorite = async (id) => {
    const updatedFavorites = new Set(favorites);
    if (favorites.has(id)) {
      updatedFavorites.delete(id); // 如果已點擊過愛心，取消收藏
    } else {
      updatedFavorites.add(id); // 新增到收藏
    }
    setFavorites(updatedFavorites);

    // 模擬將狀態儲存到後端
    console.log(`Saving favorite for item ${id}`);
    try {
      const response = await fetch("https://mock-backend/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: id, isFavorite: updatedFavorites.has(id) }),
      });
      if (response.ok) {
        console.log("Favorite saved successfully");
      } else {
        console.error("Failed to save favorite status");
      }
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  return (
    <div className="place-page">
      {/* 頂部背景圖片 */}
      <header className="place-header">
        <nav className="navbar">
          <ul>
            <li><a href="/">主頁</a></li>
            <li><a href="#logout">登出</a></li>
            <li><a href="#favorites">我的最愛</a></li>
            <li><a href="#about">關於我們</a></li>
            <li><a href="#account">個人帳號</a></li>
          </ul>
        </nav>
        <img
          src="https://i.postimg.cc/zf04nmfD/photo-1507525428034-b723cf961d3e.jpg"
          alt="Top Banner"
          className="header-image"
        />
        <h1 className="search-result">搜索結果</h1>
      </header>

      {/* 圖片和內容卡片 */}
      <section className="place-content">
        {data.length === 0 ? (
          <p>加載中...</p>
        ) : (
          <div className="card-grid">
            {data.map((item) => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.title} />
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className="date">{item.date}</p>
                  <div className="card-buttons">
                    <button
                      className="view-more"
                      onClick={() => handleViewMore(item.id)}
                    >
                      View More
                    </button>
                    <button
                      className={`favorite-button ${favorites.has(item.id) ? "saved" : ""}`}
                      onClick={() => handleFavorite(item.id)}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Place;
