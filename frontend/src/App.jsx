import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import About from "./pages/About";
import Attraction from './pages/Attraction';
import AttractionDetail from "./pages/AttractionDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
    localStorage.clear();
    sessionStorage.clear();
    return <Navigate to="/login" />
}

function RegisterAndLogout() {
    localStorage.clear();
    sessionStorage.clear();
    return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attraction"
          element={
            <ProtectedRoute>
              <Attraction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attraction/:index"
          element={
            <ProtectedRoute>
              <AttractionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <ProtectedRoute>
              <Favorite />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
