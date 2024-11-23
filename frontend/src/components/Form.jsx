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

    const name = method === "login" ? "Login" : "Register";

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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">
                    {name}
                </button>
            </form>
            {/* 動態顯示帳號相關訊息 */}
            {method === "login" ? (
                <p className="form-message">
                    還沒有帳號嗎？<Link to="/register">註冊</Link>
                </p>
            ) : (
                <p className="form-message">
                    已經有帳號嗎？<Link to="/login">登入</Link>
                </p>
            )}
        </div>
    );
}

export default Form;
