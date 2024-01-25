import React from "react";
import { DataProvider } from "./context/DataContext";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  


  return (
    <Router>
    <DataProvider>
      <Routes>

        <Route path="/" exact element={<Home />} />

      </Routes>
    </DataProvider>
    </Router>
  );
}

export default App;
