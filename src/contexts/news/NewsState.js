import { useEffect, useReducer } from "react";
import NewsReducer from "./NewsReducer";
import NewsContext from "./NewsContext";
import { SET_LOADING, SET_NEWS } from "../types";

export default function NewsState(props) {
  const initialState = {
    news: [],
    loading: false,
  };

  //some verification of date and last access is required
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toLocaleDateString();
  const lastVisit = localStorage.getItem("last_visit");

  //init reducer
  const [state, dispatch] = useReducer(NewsReducer, initialState);

  //loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //////////////////helper functions
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
    return storedNewsDestringfied;
  };
  ////////////helpers end

  ////////api call if necessary OR get data from local storage
  const setNews = async (from) => {
    setLoading();
    if (from === "api") {
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

        dispatch({
          type: SET_NEWS,
          payload: theNews,
        });

        localStorage.setItem(today, JSON.stringify(theNews));
      } catch (err) {
        console.log(err);
      }
    }

    if (from === "storage") {
      dispatch({
        type: SET_NEWS,
        payload: getStoredNewsLocaly(),
      });
    }
  };

  useEffect(() => {
    if (!verifyLastAccess()) insertLastAccess();
    if (!verifyStoredData(today)) {
      setNews("api");
      //console.log("from api");
    }
    if (verifyStoredData(today)) {
      setNews("storage");
      // console.log("from storage");
    }
  }, []);

  return (
    <NewsContext.Provider
      value={{
        state,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
}
