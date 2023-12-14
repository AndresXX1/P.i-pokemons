import React, { useState, useEffect } from 'react';
import './nivel.css';

const Nivel = ({ volumeValues }) => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const calculateStars = () => {
      if (volumeValues && volumeValues.length > 0) {
        const totalValue = volumeValues.reduce((acc, item) => acc + item.value, 0);
        const average = totalValue / volumeValues.length;
        const starCount = getStarCount(average);
        setStars(starCount);
      }
    };

    calculateStars();
  }, [volumeValues]);

  const getStarCount = (value) => {
    // Ajusta estos valores según tus necesidades
      if (value>= 900) {
      return 9;
    } else if (value >= 800) {
      return 8;
    } else if (value >= 700) {
      return 7;
    } else if (value >= 600) {
      return 6;
    } else if (value >= 500) {
      return 5;
    } else if (value >= 200) {
      return 4;
    } else if (value >= 30) {
      return 3;
    } else if (value >= 20) {
      return 2;
    } else if (value >= 10) {
      return 1;
    } else {
      return 0;
    }
  };


  return (
    <div className="star">
      {[...Array(9)].map((_, index) => (
        <span
          key={index + 1}
          className={`star ${index < stars ? 'filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Nivel;