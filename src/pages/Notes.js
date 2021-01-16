import React, { useEffect, useState } from "react";
import TheNote from "../components/TheNote";

function Notes() {
  const [theText, setTheText] = useState();
  const [notes, setNotes] = useState([]);
  //necessary to update textarea value
  const [textArea, setTextArea] = useState();

  const verifyNotesStored = () => {
    if (!!localStorage.getItem("notes")) {
      let storedNotes = JSON.parse(localStorage.getItem("notes"));
      setNotes(storedNotes);
    }
  };

  useEffect(() => {
    verifyNotesStored();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (theText !== undefined && theText !== "") {
      let theNoteObj = {
        date: new Date().toLocaleDateString(),
        id: Math.floor(Math.random() * Math.floor(100000000)),
        note: theText.trim(),
      };

      let noteArray = notes;
      noteArray.unshift(theNoteObj);

      setNotes(noteArray);
      setTextArea("");

      let noteStringfied = JSON.stringify(notes);
      localStorage.setItem("notes", noteStringfied);
    }
  };

  return (
    <div className="container">
      <div className="section-title">
        <h2>Tome notas</h2>
      </div>
      <div className="form">
        <div>
          <textarea
            onChange={(e) => {
              setTheText(e.target.value.trim());
              setTextArea();
            }}
            cols="50"
            rows="3"
            placeholder="Escreva sua nota"
            value={textArea}
          ></textarea>
        </div>
        <div>
          <button onClick={handleSave}>Salvar nota</button>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="notes">
        {notes.map((item, index) => {
          return (
            <TheNote key={index} notesState={[notes, setNotes]} {...item} />
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
