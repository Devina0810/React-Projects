import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchImages } from "./api";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import "./App.css"; // ✅ Import App.css for styling

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Fetch images when the app loads or when query/page changes
  useEffect(() => {
    const loadImages = async () => {
      try {
        const newImages = await fetchImages(query, page);
        setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages]));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    loadImages();
  }, [query, page]);

  // Function to handle search
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]); // Clear previous images when searching
  };

  return (
    <div className="app">
      <h1 className="title">SnapSeek</h1>
      <SearchBar onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage((prevPage) => prevPage + 1)} // Load more images
        hasMore={true}
      >
        <ImageGrid images={images} />
      </InfiniteScroll>
    </div>
  );
};

export default App;
