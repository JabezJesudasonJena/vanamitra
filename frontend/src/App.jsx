import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ComplaintForm from "./ComplaintForm.jsx";
import Map from './Map'
import MapOd from "./MapOd.jsx";
import AuthPage from "./AuthPage.jsx";
import MapOdd from "./MapOdd.jsx";
import Mapdd from "./Mapdd.jsx";

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
      </Routes>
    </Router>
  );
};

export default App;