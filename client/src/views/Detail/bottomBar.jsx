import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './bottomBar.css';

function BottomBar({ pokemonList }) {
  const history = useHistory();
  const bottomBarRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragThreshold, setDragThreshold] = useState(1);

  const handlePokemonClick = (id) => {
    history.push(`/home/${id}`);
  };

  const handleLoadMore = (direction) => {
    const newStartIndex =
      direction === 'right' ? startIndex + 3 : direction === 'left' ? startIndex - 3 : startIndex;

    setStartIndex(Math.max(0, Math.min(newStartIndex, pokemonList.length - 15)));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e) => {
    const distance = Math.abs(startX - e.pageX);

    if (distance > dragThreshold && !isDragging) {
      setIsDragging(true);
    }

    if (isDragging) {
      const deltaX = startX - e.pageX;

      setStartIndex((prevIndex) => {
        // Ajusta este valor para cambiar la sensibilidad al desplazamiento del mouse
        const sensitivity = 0.002;
        const deltaIndex = Math.round(deltaX * sensitivity);
        return Math.max(0, Math.min(prevIndex + deltaIndex, pokemonList.length - 15));
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        handleMouseMove(e);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      className="bottom-bar-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={bottomBarRef}
    >
      {startIndex > 0 && (
        <div className="arrow left" onClick={() => handleLoadMore('left')}>
          &#9664;
        </div>
      )}
      <div className="bottom-bar">
        {pokemonList.slice(startIndex, startIndex + 15).map((pokemon) => (
          <div key={pokemon.id} className="pokemon-button" onClick={() => handlePokemonClick(pokemon.id)}>
            <img src={pokemon.sprites} alt={pokemon.name} />
          </div>
        ))}
      </div>
      {startIndex + 15 < pokemonList.length && (
        <div className="arrow right" onClick={() => handleLoadMore('right')}>
          &#9654;
        </div>
      )}
    </div>
  );
}

export default BottomBar;