import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
    </Router>
  );
}

export default App;
