import React, { useState, useEffect } from "react";
import News from "./components/News";
import Loading from "./components/Loading";
import NavState from "./contexts/navigation/NavState";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

//PAGES
import ForLaterNews from "./pages/ForLaterNews";
import Notes from "./pages/Notes";

//COMPONENTS
import Menu from "./components/Menu";
import Header from "./components/Header";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toLocaleDateString();
  const lastVisit = localStorage.getItem("last_visit");

  const insertLastAccess = () => {
    if (lastVisit !== today) localStorage.removeItem("last_visit");
    return localStorage.setItem("last_visit", today);
  };

  const verifyLastAccess = () => {
    const hasVisitedToday = !!(lastVisit === today);
    return hasVisitedToday;
  };

  const verifyStoredData = (date) => {
    const dataStored = !!localStorage.getItem(date);
    return dataStored;
  };

  const getStoredNewsLocaly = () => {
    const storedNewsStringfied = localStorage.getItem(today);
    const storedNewsDestringfied = JSON.parse(storedNewsStringfied);
    return setNews(storedNewsDestringfied);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=world&lang=pt&media=True",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "ec2133b145mshb767111e52a5dbbp105264jsn84dd2dbf96b5",
            "x-rapidapi-host": "newscatcher.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      const theNews = data.articles;

      localStorage.setItem(today, JSON.stringify(theNews));

      setNews(theNews);
      setLoading(false);
    } catch (err) {
      setLoading(null);
      console.log(err);
    }
  };

  useEffect(() => {
    if (!verifyLastAccess()) insertLastAccess();
    if (!verifyStoredData(today)) {
      fetchData();
      //console.log("from api");
    }
    if (verifyStoredData(today)) {
      getStoredNewsLocaly();
      setLoading(false);
      //console.log("from storage");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (news.length > 0) {
    return (
      <NavState>
        <BrowserRouter>
          <Menu />
          <Header />
          <Switch>
            <Route path="/" exact>
              <div className="container">
                {news.map((item, index) => {
                  return <News key={index} {...item} />;
                })}
              </div>
            </Route>
            <Route path="/for-later-news" exact>
              <ForLaterNews />
            </Route>
            <Route path="/notes" exact>
              <Notes />
            </Route>
          </Switch>
        </BrowserRouter>
      </NavState>
    );
  }
}

export default App;
