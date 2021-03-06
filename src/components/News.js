import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import dateFormat from "dateformat";

function News(props) {
  const {
    clean_url,
    link,
    published_date,
    media,
    rights,
    summary,
    title,
    _id,
  } = props;

  const [wasSaved, setWasSaved] = useState(false);

  const saveForLater = () => {
    localStorage.setItem(_id, "saved");
    setWasSaved(true);
    if (!!localStorage.getItem("for_later")) {
      let storedForLater = JSON.parse(localStorage.getItem("for_later"));

      storedForLater = [...storedForLater, props];
      return localStorage.setItem("for_later", JSON.stringify(storedForLater));
    } else {
      let saveForLaterArray = [props];
      return localStorage.setItem(
        "for_later",
        JSON.stringify(saveForLaterArray)
      );
    }
  };

  const removeForLater = () => {
    setWasSaved(false);
    localStorage.removeItem(_id);
    let storedForLater = JSON.parse(localStorage.getItem("for_later"));
    let filteredStorage = storedForLater.filter((item) => item._id !== _id);
    if (filteredStorage.length === 0) localStorage.removeItem("for_later");
    if (filteredStorage.length > 0) {
      localStorage.setItem("for_later", JSON.stringify(filteredStorage));
    }
  };

  useEffect(() => {
    if (localStorage.getItem(_id)) setWasSaved(true);
  }, []);

  return (
    <div className="news-box">
      <div className="header-news">
        <h3 className="title">{title}</h3>
        <small className="published-date">
          {dateFormat(published_date, "dd/mm/yyyy")}
        </small>
        <a href={`whatsapp://send?text=${link}`} target="_blank">
          <FaWhatsapp className="share" />
        </a>
      </div>

      {media && (
        <>
          <img className="img" src={media} alt="imagem da notícia" />
        </>
      )}

      <div className="summary">
        <p>{summary}</p>
      </div>

      <div className="footer">
        <div className="footer-note">
          <small className="footer-note-text">
            <p>
              <a href={link}> Ler matéria </a>
            </p>
          </small>
        </div>
        <div className="footer-note">
          <small className="footer-note-text">
            <p>{rights !== "" ? rights : clean_url}</p>
          </small>
        </div>
        <div className={`footer-note ${wasSaved ? "was-saved" : ""}`}>
          <small className="footer-note-text">
            {wasSaved && (
              <p className="pointer" onClick={removeForLater}>
                Remover
              </p>
            )}
            {!wasSaved && (
              <p className="pointer" onClick={saveForLater}>
                Salvar
              </p>
            )}
          </small>
        </div>
      </div>
    </div>
  );
}

export default News;
