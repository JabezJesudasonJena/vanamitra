import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ComplaintForm from "./ComplaintForm.jsx";
import Map from './Map'
import MapOd from "./MapOd.jsx";
import AuthPage from "./AuthPage.jsx";
import MapOdd from "./MapOdd.jsx";
import Mapdd from "./Mapdd.jsx";
import Home from "./Home.jsx";
//import LoginPage from "./LoginPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/form" element={<ComplaintForm />} />
        <Route path="/map-od" element={<MapOd />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/mapod" element={<MapOdd />} />
        <Route path="/mapdd" element={<Mapdd />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;