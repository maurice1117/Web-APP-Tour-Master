import { useNavigate, Link } from "react-router-dom";
import "../styles/About.css";
import travelFriendImage from '../assets/travel_friend.jpg';
import Bar from "../components/Bar";

function About() {

    return (
        <div className="about-us">
            <Bar />
            {/* 標題部分 */}
            <div className="hero-section">
                <h1>About Us</h1>
                <div className="hero-image">
                    <img src={travelFriendImage} alt="Travel Friends" />
                </div>
            </div>

            <div className="why-choose-us">
                <h2>Why Choose Us</h2>
                <p>These popular destinations have a lot to offer</p>
            </div>

            {/* 三個特色 */}
            <div className="features">
                <div className="feature-item">
                    <i className="icon icon-price"></i>
                    <h3>Best price guarantee</h3>
                    <p>Good Good Good</p>
                </div>
                <div className="feature-item">
                    <i className="icon icon-booking"></i>
                    <h3>Easy Booking</h3>
                    <p>Good Good Good</p>
                </div>
                <div className="feature-item">
                    <i className="icon icon-service"></i>
                    <h3>Customer Service 24h</h3>
                    <p>Good Good Good</p>
                </div>
            </div>

            {/* 關於我們 */}
            <div className="about-content">
                <h2>About Travelaja.com</h2>
                <p>
                    Best Team Ever
                </p>
                <img src="your-image-url.jpg" alt="About Us" />
            </div>

            {/* 團隊成員 */}
            <div className="team-section">
                <h2>Our Teams</h2>
                <p>six talented programmer</p>
                <div className="team">
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 1" />
                        <p>高大剛</p>
                        <span>Web Designer</span>
                    </div>
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 2" />
                        <p>林芊妤</p>
                        <span>Marketing Director</span>
                    </div>
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 3" />
                        <p>黃子寰</p>
                        <span>Medical Check</span>
                    </div>
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 4" />
                        <p>湯語蕎</p>
                        <span>Doctor Assistant</span>
                    </div>
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 4" />
                        <p>蕭宥平</p>
                        <span>Doctor Assistant</span>
                    </div>
                    <div className="team-member">
                        <img src="image-url.jpg" alt="Member 4" />
                        <p>鍾怡欣</p>
                        <span>Doctor Assistant</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
