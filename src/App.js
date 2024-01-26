import React from "react";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import './styles/app.css'

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/user/:userID" element={<UserPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
