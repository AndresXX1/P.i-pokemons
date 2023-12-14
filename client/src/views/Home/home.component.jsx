import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon, getTypes, orderByName, orderByAttack, getPokemonByName } from "../../redux/actions/actions";
import Navbar from "../components/Navbar/navbar.component";
import FilterName from "../components/Filter/filterName";
import FilterAttack from "../components/Filter/filterAttack";
import FilterByOriginType from "../components/Filter/filterByO&Type";
import Cards from "../components/Cards/cards.component";
import Pagination from "../components/Pagination/pagination.componente";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemon);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokeXPage] = useState(12);
  const [nameOrder, setNameOrder] = useState("asc");
  const [attackOrder, setAttackOrder] = useState("asc");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const indexOfLastPokemon = currentPage * pokeXPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokeXPage;

  // Obtener una copia del array original
  let currentPokemons = [...allPokemons];

  // Aplicar los filtros
  useEffect(() => {
    // Filtro por nombre
    let sortedPokemons = [...allPokemons];

    if (nameOrder === "asc") {
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (nameOrder === "des") {
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
    
    }

    

    // Filtro por ataque
    if (attackOrder === "asc") {
      sortedPokemons.sort((a, b) => a.attack - b.attack);
    } else if (attackOrder === "des") {
      sortedPokemons.sort((a, b) => b.attack - a.attack);
    }

    // Filtro por origen y tipo
    if (selectedOrigin !== "all" || selectedType !== "all") {
      
      sortedPokemons = sortedPokemons.filter(pokemon => {
        return (
          (selectedOrigin === "all" || pokemon.origin === selectedOrigin) &&
          (selectedType === "all" || pokemon.type === selectedType)
        );
      });
    }



    currentPokemons = sortedPokemons;
  }, [allPokemons, nameOrder, attackOrder, selectedOrigin, selectedType]);

  const totalPages = Math.ceil(currentPokemons.length / pokeXPage);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    goToFirstPage()
  }, [allPokemons]
  )

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Funciones para manejar cambios en los filtros
  const handleNameChange = (order) => {
    setNameOrder(order);
  };

  const handleAttackChange = (order) => {
    setAttackOrder(order);
  };

  const handleOriginChange = (origin) => {
    setSelectedOrigin(origin);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    dispatch(getPokemon());
    dispatch(getTypes());
  }, [dispatch]);


  return (
    <div>
      <div className="home">
        <Navbar />
        <div className="content">
          <h1>Bienvenido a la Pokédex</h1>
        
          <Pagination
            pagination={pagination}
            allPokemons={currentPokemons.length}
            pokeXPage={pokeXPage}
            page={currentPage}
          />
          <div className="pagination-buttons">
            <button
              className="pagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              Primera Página
            </button>
           
            <button
              className="pagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              Última Página
            </button>
          </div>
          <Cards currentPokemons={currentPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)} />
        </div>
      </div>
    </div>
  );
}

export default Home;