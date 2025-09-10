import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">Welcome to FRA-Satyapan</h1>
        <p className="home-subtitle">
          Empowering Tribal Communities through Voice & Rights
        </p>
        <Link to="/form">
          <button className="home-btn">Submit a Complaint</button>
        </Link>
        <Link to="/map">
          <button className="home-btn">Map</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
