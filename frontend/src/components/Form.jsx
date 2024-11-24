import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 加入 Link
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "登入" : "註冊";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container ${method}`}>
            {/* 左側表單區域 */}
            <form onSubmit={handleSubmit}>
                <div className="left-section">
                    <h1 className="name">Travling!</h1>
                    <h2 className="title">{name}</h2>
                    <div className="input-container">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="請輸入用戶名稱"
                            className="input"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="請輸入密碼"
                            className="input"
                        />
                    </div>
                    {loading && <LoadingIndicator />}
                    <button className="button" type="submit">
                        {name}
                    </button>
                    <p className="footer-text">
                        {method === "login" ? (
                            <>
                                還沒有帳號嗎？<Link to="/register">註冊</Link>
                            </>
                        ) : (
                            <>
                                已經有帳號了嗎？<Link to="/login">登入</Link>
                            </>
                        )}
                    </p>
                </div>
            </form>

            {/* 右側圖片區域 */}
            <div className="right-section">
                <img
                    src={
                        method === "login"
                            ? "https://i.postimg.cc/zBsXywLD/iphaank-58409901-170643610603788-9093298758546613071-n.jpg"
                            : "https://i.postimg.cc/vTcQJhZL/image.jpg"
                    }
                    alt="背景圖片"
                    className="image"
                />
            </div>
        </div>
    );
}

export default Form;
