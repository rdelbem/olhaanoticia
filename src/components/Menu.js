import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <ul className="menu-list">
        <li>
          {" "}
          <Link to="/">Hoje</Link>{" "}
        </li>
        <li>
          <Link to="/for-later-news">Salvas</Link>
        </li>
        <li>
          <Link to="/notes">Notas</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
