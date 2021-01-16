import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

//PAGES
import ForLaterNews from "./pages/ForLaterNews";
import Notes from "./pages/Notes";
import Menu from "./components/Menu";

function Main() {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact>
          <App />
        </Route>
        <Route path="/for-later-news" exact>
          <ForLaterNews />
        </Route>
        <Route path="/notes" exact>
          <Notes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
