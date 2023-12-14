import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getPokemonDetail, getPokemon } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import BottomBar from './bottomBar'; // Importa el nuevo componente BottomBar
import "./detail.css";
import "../../views/components/Card/card.css"


function Detail({ match }) {
  const dispatch = useDispatch();
  const pokemonID = useSelector(state => state.detail);

  // Nuevo estado para almacenar la lista de Pokémon
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState({});
 
 

   useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la lista de Pokémon solo si aún no la tenemos
        if (pokemonList.length === 0) {
          const list = await dispatch(getPokemon());
          setPokemonList(list);
        }

        // Obtener detalles del Pokémon actual
        const currentPokemonID = match.params.id;
        const details = await dispatch(getPokemonDetail(currentPokemonID));

        // Actualizar el estado con los detalles más recientes
        setPokemonDetails((prevDetails) => ({
          ...prevDetails,
          [currentPokemonID]: details,
        }));
      } catch (error) {
        console.error('Error al obtener detalles de Pokémon en Detail:', error);
        // Manejar el error según tus necesidades
      }
    };

    fetchData();

    return () => {
      // No limpiar el estado aquí para que los detalles se mantengan
    };
  }, [dispatch, match.params.id, pokemonList]);

  const calculateStars = () => {
    const characteristics = [pokemonID.hp, pokemonID.attack, pokemonID.defense, pokemonID.speed, pokemonID.height, pokemonID.weight];
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

  const getExtendedWidth = (value, maxWidth) => {
    // Calcula el ancho de la barra de volumen asegurándote de que no supere el máximo
    const width = value <= maxWidth ? `${value}px` : `${maxWidth}px`;
  
    return width;
  };

// Verifica si pokemonID está definido antes de acceder a sus propiedades
if (!pokemonID) {
  return <div>Loading...</div>; // Puedes mostrar un mensaje de carga o algo similar
}


  return (
    <div className="pokedex">
      <div className="detail">

      <h1 className='nom'>{pokemonID.name}</h1>
      
        <div className='imagen'>
        <img src={pokemonID.sprites} alt="Pokemon Sprite" />
        </div>
   
          <div className='feacturess'>
        <div className="stars">
          {[...Array(9)].map((_, index) => (
            <span key={index} className={`star ${index < starsCount ? 'gold' : ''}`}>&#9733;</span>
          ))}
        </div>

        {/* Representación de las características con barras de volumen */}

        <div className='id'> ID:{pokemonID.id}</div>

        <div className="volume-bars">
  <div className="volume-bar-container">
    <div className="lado-attack">HP:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.hp, 500) }}></div>
      <div className="volume-label">{pokemonID.hp}</div>
    </div>
  </div>

  <div className="volume-bar-container">
    <div className="lado-attack">Attack:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.attack, 500) }}></div>
      <div className="volume-label">{pokemonID.attack}</div>
    </div>
  </div>

  <div className="volume-bar-container">
    <div className="lado-attack">Defense:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.defense, 500) }}></div>
      <div className="volume-label">{pokemonID.defense}</div>
    </div>
  </div>

  <div className="volume-bar-container">
    <div className="lado-attack">Speed:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.speed, 500) }}></div>
      <div className="volume-label">{pokemonID.speed}</div>
    </div>
  </div>

  <div className="volume-bar-container">
    <div className="lado-attack">Height:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.height, 500) }}></div>
      <div className="volume-label">{pokemonID.height}</div>
    </div>
  </div>

  <div className="volume-bar-container">
    <div className="lado-attack">Weight:</div>
    <div className="volume-bar-label-container">
      <div className="volume-bar" style={{ width: getExtendedWidth(pokemonID.weight, 500) }}></div>
      <div className="volume-label">{pokemonID.weight}</div>
    </div>
  </div>
</div>
        <div className="card-types">
            {pokemonID.types && pokemonID.types.map((type, index) => (
              <p key={index} className={`card-type ${type.name}`}>
                {type.name}
              </p>
            ))}
          </div>
        </div>


<div>
  <button>
    {(pokemonID.weight < 100)}
  </button>
</div>

        <div style={{ display: 'flex' }}>
  <div className='boton'>
    <Link to="/home">
      <button className='buttonDetail'>Home</button>
    </Link>
  </div>

  <div className='boton1'>
    <Link to="/create">
      <button className='buttonDetail'>Create</button>
    </Link>
  </div>
</div>


{/* Barra inferior */}
<div className='bottonBar'>
<BottomBar pokemonList={pokemonList} />

</div>
</div>
</div>
       
);
          }

export default Detail;