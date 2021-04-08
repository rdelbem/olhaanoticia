import React from "react";
import NavState from "./contexts/navigation/NavState";
import NewsState from "./contexts/news/NewsState";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//STYLES
import "./App.css";

//PAGES
import ForLaterNews from "./pages/ForLaterNews";
import Notes from "./pages/Notes";
import NewsFront from "./pages/NewsFront";

//COMPONENTS
import Menu from "./components/Menu";
import Header from "./components/Header";

function App() {
  return (
    <NewsState>
      <NavState>
        <BrowserRouter>
          <Menu />
          <Header />
          <Switch>
            <Route path="/" exact>
              <NewsFront />
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
    </NewsState>
  );
}

export default App;
