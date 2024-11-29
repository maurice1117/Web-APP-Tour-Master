import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "登入" : "註冊";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (method === "register" && password !== confirmPassword) {
            alert("密碼和確認密碼不一致！");
            setLoading(false);
            return;
        }

        try {
            const requestData = method === "login" 
                ? { username, password } 
                : { username, password, email };

            const res = await api.post(route, requestData);

            if (method === "login") {
                if (res.data && res.data.access && res.data.refresh) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    navigate("/");
                } else {
                    alert("登入失敗，請檢查用戶名或密碼");
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during login:", error); 
            alert("發生錯誤，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = username && password && (method === "login" || (email && confirmPassword === password));

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
                        {method === "register" && (  // Only show email and confirm password inputs on registration
                            <>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="請確認密碼"
                                    className="input"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="請輸入電子郵件"
                                    className="input"
                                />
                            </>
                        )}
                    </div>
                    {loading && <LoadingIndicator />}
                    <button className="button" type="submit" disabled={!isFormValid}>
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
