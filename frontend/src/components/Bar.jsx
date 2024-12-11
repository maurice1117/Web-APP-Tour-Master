import React, { useState } from "react";
import "../styles/Bar.css"

const Bar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return <div className="bar">
            <div className="bar-content">
                <a href="/" className="bar-logo">
                    <h1>Tour Master</h1>
                </a>
                <div className={`bar-links ${menuOpen ? "open" : ""}`}>
                    <a href="/">首頁</a>
                    <a href="/profile">個人檔案</a>
                    <a href="/favorite">我的最愛</a>
                    <a href="/about">關於我們</a>
                    <a href="/logout">登出</a>
                </div>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <div>&#9776;</div>
                </div>
            </div>
        <div className="bar"></div>
    </div>
}

export default Bar