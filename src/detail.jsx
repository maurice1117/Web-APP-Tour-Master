import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: {
                id,
                title: `Memorable Festivals On Bali Beach`,
                description: `Bali Beach is known for its vibrant festivals that attract tourists from around the world. Whether it’s the traditional dance performances or the colorful parades, each event showcases the rich cultural heritage of the island.`,
                
                mainImage: "https://i.postimg.cc/B620DQjr/2024-11-30-6-19-53.png", // 橫向圖片
                additionalDescription: `The festivals often include culinary delights, where visitors can taste the local cuisine, as well as handcrafted souvenirs that reflect the island's artistic traditions. It's not just a celebration; it's an experience that creates lasting memories.`,
                gallery: [
                  "https://via.placeholder.com/400x300",
                  "https://via.placeholder.com/400x300",
                ],
                recommendations: Array(3)
                  .fill(0)
                  .map((_, index) => ({
                    title: `Wakatobi Beach Is A Paradise For Coral Reefs In Indonesia`,
                    image: "https://via.placeholder.com/300x200",
                  })),
              },
            });
          }, 1000)
        );
        setDetailData(response.data);
      } catch (error) {
        console.error("Error fetching detail data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailData();
  }, [id]);

  if (loading) {
    return <p>加載中...</p>;
  }

  if (!detailData) {
    return <p>未找到數據！</p>;
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <nav className="navbar">
          <ul>
            <li><a href="/">主頁</a></li>
            <li><a href="#logout">登出</a></li>
            <li><a href="#favorites">我的最愛</a></li>
            <li><a href="#about">關於我們</a></li>
            <li><a href="#account">個人帳號</a></li>
          </ul>
        </nav>
        <img src={detailData.mainImage} alt={detailData.title} className="header-image" />
      </header>

      <section className="detail-content">
        <div className="main-content">
          <h1>{detailData.title}</h1>
          <p className="description">{detailData.description}</p>
          
          <img src={detailData.mainImage} alt="Main Content" className="main-image" />
          <p className="additional-description">{detailData.additionalDescription}</p>
          <div className="gallery">
            {detailData.gallery.map((image, index) => (
              <img key={index} src={image} alt={`Gallery ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className="recommendations">
          <h2>Other Destinations</h2>
          <div className="recommendation-grid">
            {detailData.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <img src={rec.image} alt={rec.title} />
                <p>{rec.title}</p>
                <button className="view-more">View More</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;

