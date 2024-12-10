import { useNavigate, Link } from "react-router-dom";
import { ImCool } from "react-icons/im";
import { ImGrin } from "react-icons/im";
import { ImHistory } from "react-icons/im";
import man_sea from '../../assets/man sea.jpg';
import solo_flower from '../../assets/solo flower.jpg';
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
                    <img src={solo_flower} alt="solo_flower" />
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
                    <p>The best search engine</p>
                </div>
                <div className="feature-item">
                    <ImGrin size={100} />
                    <h3>Exquisite UI</h3>
                    <p>UI is like an insane art work</p>
                </div>
                <div className="feature-item">
                    <ImHistory size={100} />
                    <h3>Customer Service 24h</h3>
                    <p>Programmers are friendly</p>
                </div>
            </div>

            {/* 關於我們 */}
            <div className="about-content">
                <div className="about-text">
                    <h2>About Travelaja.com</h2>
                    <p>
                        Never work with a team like this. Everyone finished their jobs independently. Amazing team. 
                    </p>
                    <p>
                        Love you guys.
                    </p>
                </div>
                <div className="about-image">
                    <img src={man_sea} alt="man_sea" />
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
                        <span>Full Stack developer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 2" />
                        <p>林芊妤</p>
                        <span>Chief Technology Officer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 3" />
                        <p>黃子寰</p>
                        <span>PM & CSS Designer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 4" />
                        <p>湯語蕎</p>
                        <span>Frontend Developer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 5" />
                        <p>蕭宥平</p>
                        <span>Frontend Developer</span>
                    </div>
                    <div className="team-member">
                        <img src={Jake_the_Dog} alt="Member 6" />
                        <p>鍾怡欣</p>
                        <span>Frontend Developer</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default About;
