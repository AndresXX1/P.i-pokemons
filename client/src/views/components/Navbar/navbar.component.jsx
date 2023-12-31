// Navbar.js
import React from "react";

import FilterAttack from "../Filter/filterAttack";
import Search from "../Search/search.components";
import FilterName from "../Filter/filterName";
import FilterByOriginType from "../Filter/filterByO&Type";
import { Link } from "react-router-dom";
import "./navBar.css";

function Navbar({ onSearch }) {
  return (
    <div className="navbar">
      <FilterByOriginType className="navbar-item" />
      <FilterName className="navbar-item" />
      <FilterAttack className="navbar-item" />
      <Search onSearch={onSearch} className="navbar-item" />
      <Link to="/create" className="create-button navbar-item">
        Create
      </Link>
    </div>
  );
}

export default Navbar;
