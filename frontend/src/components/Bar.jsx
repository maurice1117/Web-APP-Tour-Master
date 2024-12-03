import "../styles/Bar.css"

const Bar = () => {
    return <div className="bar">
            <div className="bar-content">
                <h1>travelaja</h1>
                <div className="bar-links">
                    <a href="/">首頁</a>
                    <a href="/profile">個人檔案</a>
                    <a href="/favorite">我的最愛</a>
                    <a href="/about">關於我們</a>
                    <a href="/logout">登出</a>
                </div>
            </div>
        <div className="bar"></div>
    </div>
}

export default Bar