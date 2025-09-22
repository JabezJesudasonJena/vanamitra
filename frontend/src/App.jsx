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
import Dash from "./Dash.jsx";
import Chatbot from "./Chatbot.jsx";
//import LoginPage from "./LoginPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/homea" element={<HomePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/form" element={<ComplaintForm />} />
        <Route path="/map-od" element={<MapOd />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/mapod" element={<MapOdd />} />
        <Route path="/mapdd" element={<Mapdd />} />
        <Route path="/" element={<Home />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/bot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;