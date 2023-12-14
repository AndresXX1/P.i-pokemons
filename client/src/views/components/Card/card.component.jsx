import React, { useState } from "react";
import "./card.css"; // Agrega tus estilos CSS aquí

function Card({ pokemon }) {
  const { name, sprites, types } = pokemon;
 

  const calculateStars = () => {
    const characteristics = [pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed, pokemon.height, pokemon.weight];
    const average = characteristics.reduce((acc, value) => acc + value, 0) / characteristics.length;

    if (average >= 900) {
      return 9;
    } else if (average >= 800) {
      return 8;
    } else if (average >= 700) {
      return 7;
    } else if (average >= 600) {
      return 6;
    } else if (average >= 500) {
      return 5;
    } else if (average >= 200) {
      return 4;
    } else if (average >= 30) {
      return 3;
    } else if (average >= 20) {
      return 2;
    } else if (average >= 10) {
      return 1;
    } else {
      return 0;
    }
  };

  
  const starsCount = calculateStars();

  const pesohandler = () => {
    const peso = pokemon.height;
  
    if (peso < 100) {
      return peso;
    } else {
      return "este es mayor a 100";
    }
  }


  return (
    <div className="card">
      <img src={sprites} alt={`${name} Img`} className="card-image" />
      <h2 className="card-title">{name}</h2>
      <div className="card-types">
        {types.map((type) => (
          <p key={type.id} className={`card-type ${type.name}`}>
            {type.name}
          </p>
        ))}
      </div>
      <div className="stars">
        {[...Array(starsCount)].map((_, index) => (
          <span key={index} className="star gold-star">&#9733;</span>
        ))}
      </div>
    
        
    </div>
  );
}

export default Card;
