import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderByAttack } from "../../../redux/actions/actions";
import "./css/filter.css";

const FilterAttack = () => {
  const [selectedAttack, setSelectedAttack] = useState();
  const dispatch = useDispatch();

  const handleAttackChange = (event) => {
    const attack = event.target.value;
    setSelectedAttack(attack);
    dispatch(orderByAttack(attack));
  };

  const clearFilter = () => {
    setSelectedAttack(""); // Reiniciar el estado del filtro
    dispatch(orderByAttack("")); // Limpiar el filtro en el estado global si es necesario
  };

  return (
    <div className="filter">
      <label>Attack:</label>
      <select onChange={handleAttackChange} value={selectedAttack}>
        <option value="">Clear Filter</option>
        <option value="asc">Descendente</option>
        <option value="des">Ascendente</option>
      </select>
      <button onClick={clearFilter}>Clear Filter</button>
    </div>
  );
};

export default FilterAttack;