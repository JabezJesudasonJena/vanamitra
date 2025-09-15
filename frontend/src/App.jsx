import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ComplaintForm from "./ComplaintForm.jsx";
import Map from './Map'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/form" element={<ComplaintForm />} />
      </Routes>
    </Router>
  );
};

export default App;