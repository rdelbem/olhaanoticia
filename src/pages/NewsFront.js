import React, { useContext } from "react";
import News from "../components/News";
import Loading from "../components/Loading";
import NewsContext from "../contexts/news/NewsContext";

export default function NewsFront() {
  const newsContext = useContext(NewsContext);
  const { state } = newsContext;

  if (state.loading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        {state.news.map((item, index) => {
          return <News key={index} {...item} />;
        })}
      </div>
    );
  }
}
