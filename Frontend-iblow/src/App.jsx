import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CanvaCallback from "./components/CanvaCallback";
import { initCanva } from "./utils/canvaConfig";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("Animal"); // Mặc định tag là "Animal"
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Initialize Canva SDK when app loads
    initCanva();
    fetchImages(); // Load ảnh theo tag mặc định
  }, []);

  // Gọi API từ backend
  const fetchImages = async (tag = "Animal") => {
    try {
      const response = await fetch(`${API_URL}/api/images?tag=${encodeURIComponent(tag)}`);
      const data = await response.json();
      if (response.status === 404) {
        setResults([]); // Gán mảng rỗng nếu không tìm thấy
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };  

  const handleSearch = (query) => {
    const searchQuery = typeof query === "string" ? query : searchTerm;
    if (!searchQuery.trim()) return;
    fetchImages(searchQuery); // Tìm kiếm theo tag
  };

  const handleEditComplete = () => {
    // Reload images after editing is complete
    fetchImages(searchTerm);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header
                handleSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <ProductList results={results} />
            </>
          } 
        />
        <Route 
          path="/canva-callback" 
          element={<CanvaCallback onComplete={handleEditComplete} />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;