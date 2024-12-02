import { useNavigate, Link } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        navigate("/logout");
    };
    
    return (
        <div>
            {/* 導覽欄 */}
            <nav className="navbar">
                <div className="navbar-content">
                    <h1>travelaja</h1>
                    <div className="navbar-links">
                        <Link to="/profile">個人檔案</Link>
                        <Link to="/favorite">我的最愛</Link>
                        <Link to="/about">關於我們</Link>
                        <Link to="/logout">登出</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Home;
