import React from "react";

const ImageGrid = ({ images }) => {
  return (
    <div className="grid-container">
      {images.map((img) => (
        <div key={img.id} className="image-card">
          <img src={img.urls.small} alt={img.alt_description} />
          <a href={img.links.download} download className="download-btn">
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
