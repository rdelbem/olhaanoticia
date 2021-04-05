import React, { useContext } from "react";
import NavContext from "../contexts/navigation/NavContext";
import headerImgHuge from "../images/header.jpg";
import headerImgBig from "../images/header_high.jpg";
import headerImgMedium from "../images/header_medium.jpg";
import headerImgNormal from "../images/header_normal.jpg";
import headerImgSmall from "../images/header_small.jpg";

export default function Header() {
  const navContext = useContext(NavContext);
  const { state } = navContext;

  return (
    <div className="header">
      <div className="section-title">
        {state === null && <h2>Últimas notícias de hoje</h2>}
        {state?.page === "home" && <h2>Últimas notícias de hoje</h2>}
        {state?.page === "later" && <h2>Para ler mais tarde</h2>}
        {state?.page === "notes" && <h2>Tome notas</h2>}
      </div>
      <img
        src={headerImgNormal}
        srcSet={`${headerImgSmall} 500w, ${headerImgMedium} 1100w, ${headerImgBig} 1800w, ${headerImgHuge} 2863w`}
        alt="header"
      />
    </div>
  );
}
