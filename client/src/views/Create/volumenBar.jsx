import React, { useState, useEffect, useRef } from 'react';
import './volumenBar.css'; // Ajusta la ruta según sea necesario

const VolumeBar = ({ value, onChange, onInputChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartValue, setDragStartValue] = useState(0);
  const [roundedValue, setRoundedValue] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const rounded = Math.min(Math.max(Math.round(value), 0), 999); // Limitar a 999
    setRoundedValue(rounded);
  }, [value]);

  const calculateValueFromMouse = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = Math.min(Math.max(x / rect.width, 0), 1);
      const newValue = Math.min(Math.round(percentage * 999), 999); // Limitar a 999
      setRoundedValue(newValue);

      // Llama a la función onInputChange con el nuevo valor del input
      onInputChange && onInputChange(newValue);
    }
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStartValue(roundedValue);
    calculateValueFromMouse(event);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (onChange) {
      onChange(roundedValue);
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging && onChange) {
      calculateValueFromMouse(event);
    }
  };

  return (
    <div
      ref={containerRef}
      className="volume-bar-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'pointer' }}
    >
      <div className="volume-bar" style={{ width: `${(roundedValue / 999) * 100}%` }}>
        <div className="volume-label" style={{ userSelect: 'none' }}>{roundedValue}</div>
      </div>
    </div>
  );
};

export default VolumeBar;