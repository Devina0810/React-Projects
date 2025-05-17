import axios from "axios";

// Get API key from environment variable
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Fetch images (search or random) with pagination
export const fetchImages = async (query, page = 1) => {
  const url = query
    ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=20&client_id=${ACCESS_KEY}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${ACCESS_KEY}`;

  const response = await axios.get(url);
  return query ? response.data.results : response.data; // Different structure for search vs random
};
