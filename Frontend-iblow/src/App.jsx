import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("wedding"); // Mặc định tag là "birthday"
  const [results, setResults] = useState([]);

  // Gọi API từ backend
  const fetchImages = async (tag = "wedding") => {
    try {
      const response = await fetch(`${API_URL}/api/images?tag=${encodeURIComponent(tag)}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching images", err);
    }
  };

  useEffect(() => {
    fetchImages(); // Load ảnh theo tag mặc định
  }, []);

  const handleSearch = (query) => {
    const searchQuery = typeof query === "string" ? query : searchTerm;
    if (!searchQuery.trim()) return;
    fetchImages(searchQuery); // Tìm kiếm theo tag
  };

  return (
    <div>
      <Header
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ProductList results={results} />
    </div>
  );
};

export default App;
