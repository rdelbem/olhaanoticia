import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavContext from "../contexts/navigation/NavContext";

function Menu() {
  const navContext = useContext(NavContext);
  const { home, later, notes } = navContext;

  return (
    <div className="menu">
      <ul className="menu-list">
        <li>
          {" "}
          <Link onClick={() => home()} to="/">
            Hoje
          </Link>{" "}
        </li>
        <li>
          <Link onClick={() => later()} to="/for-later-news">
            Salvas
          </Link>
        </li>
        <li>
          <Link onClick={() => notes()} to="/notes">
            Notas
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
