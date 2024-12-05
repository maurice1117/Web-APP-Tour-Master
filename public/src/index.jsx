import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Place from "./place";
import Detail from "./detail"; // 新增 detail 頁面

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/place" element={<Place />} />
        <Route path="/detail/:id" element={<Detail />} /> {/* Detail 頁面 */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

