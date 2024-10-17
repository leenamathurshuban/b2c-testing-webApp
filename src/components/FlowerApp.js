// src/App.js
import React, { useEffect, useState } from 'react';
import Flower from './Flower';

// Array of flower image URLs
const flowerImages = [
  '/images/bat.png',
  '/images/gtts_022.png',
  '/images/ghost-011.png',
  '/images/gtts_023.png',
  '/images/bat01.png',
  // Add more flower images as needed
];

const FlowerApp = () => {
  const [flowers, setFlowers] = useState([]);

  const createFlower = () => {
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2; // Duration between 2s and 5s
    const image = flowerImages[Math.floor(Math.random() * flowerImages.length)]; // Randomly select a flower image
    setFlowers((prevFlowers) => [
      ...prevFlowers,
      {
        id: Date.now() + Math.random(),
        style: {
          left: `${x}px`,
          animationDuration: `${duration}s`,
        },
        image,
      },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(createFlower, 800); // Create a flower every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flowApp">
      {flowers.map((flower) => (
        <Flower key={flower.id} style={flower.style} image={flower.image} />
      ))}
    </div>
  );
};

export default FlowerApp;
