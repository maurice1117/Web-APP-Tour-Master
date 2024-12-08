import { useNavigate, Link } from "react-router-dom";
import { ImCool } from "react-icons/im";
import { ImGrin } from "react-icons/im";
import { ImHistory } from "react-icons/im";
import travelFriendImage from '../../assets/travel_friend.jpg';
import Jake_the_Dog from '../../assets/Jake the Dog.jpg';
import Bar from "../components/Bar";
import "../styles/About.css";

function About() {

    return (
        <div className="about-us">
            <Bar />
            {/* 標題部分 */}
            <div className="hero-section">
                <h1>About Us</h1>
                <div className="hero-image">
                    <img src={Jake_the_Dog} alt="Travel Friends" />
                </div>
            </div>

            <div className="why-choose-us">
                <h2>Why Choose Us</h2>
                <p>These popular destinations have a lot to offer</p>
            </div>

            {/* 三個特色 */}
            <div className="features">
                <div className="feature-item">
                    <ImCool size={100} />
                    <h3>Best Searching Experience</h3>
                    <p>Good Good Good</p>
                </div>
                <div className="feature-item">
                    <ImGrin size={100} />
                    <h3>Easy UI</h3>
                    <p>Good Good Good</p>
                </div>
                <div className="feature-item">
                    <ImHistory size={100} />
                    <h3>Customer Service 24h</h3>
                    <p>Good Good Good</p>
                </div>
            </div>

            {/* 關於我們 */}
            <div className="about-content">
                <div className="about-text">
                    <h2>About Travelaja.com</h2>
                    <p>
                        Best team ever.
                    </p>
                    <p>
                        Good good good
                    </p>
                </div>
                <div className="about-image">
                    <img src={Jake_the_Dog} alt="About Us" />
                </div>
            </div>


            {/* 團隊成員 */}
            <div className="team-section">
                <h2>Our Teams</h2>
                <p>Six talented programmers</p>
                <div className="team">
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 1" />
                        <p>高大剛</p>
                        <span>Web Designer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 2" />
                        <p>林芊妤</p>
                        <span>Marketing Director</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 3" />
                        <p>黃子寰</p>
                        <span>Medical Check</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 4" />
                        <p>湯語蕎</p>
                        <span>Doctor Assistant</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 5" />
                        <p>蕭宥平</p>
                        <span>Doctor Assistant</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 6" />
                        <p>鍾怡欣</p>
                        <span>Doctor Assistant</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default About;
