import React, { useEffect, useState } from "react";
import NewsLater from "../components/NewsLater";

function ForLaterNews() {
  const verifyDataStoredLocally = () => {
    return !!localStorage.getItem("for_later");
  };

  const getDataFromStorage = () => {
    let theParsedData = JSON.parse(localStorage.getItem("for_later"));
    if (theParsedData === null) {
      return [];
    } else {
      return !!theParsedData.length ? theParsedData : [];
    }
  };

  const [savedNews, setSavedNews] = useState(getDataFromStorage());

  if (verifyDataStoredLocally()) {
    return (
      <div className="container">
        {savedNews.map((item, index) => {
          return (
            <NewsLater
              key={index}
              {...item}
              newsState={[savedNews, setSavedNews]}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="no-news">
          <p>Você ainda não salvou nenhuma notícia!</p>
        </div>
      </div>
    );
  }
}

export default ForLaterNews;
