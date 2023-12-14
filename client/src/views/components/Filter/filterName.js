import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByName } from "../../../redux/actions/actions";
import "./css/filter.css";

const FilterName = () => {
  const dispatch = useDispatch();
  const [selectedName, setSelectedName] = useState();

  const handleNameChange = (event) => {
    const name = event.target.value;
    setSelectedName(name);
    dispatch(orderByName(name));
  };

  const clearFilter = () => {
    setSelectedName(""); // Reiniciar el estado del filtro
    dispatch(orderByName("")); // Limpiar el filtro en el estado global si es necesario
  };

  return (
    <div className="filter">
      <label>Name:</label>
      <select onChange={handleNameChange} value={selectedName}>
        <option value="">Clear Filter</option>
        <option value="asc">Ascendente</option>
        <option value="des">Descendente</option>
      </select>
      <button onClick={clearFilter}>Clear Filter</button>
    </div>
  );
};

export default FilterName;