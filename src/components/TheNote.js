import React, { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import NotesContext from "../contexts/notes/NotesContext";

function TheNote(props) {
  const { date, id, note } = props;
  const notesContext = useContext(NotesContext);
  const {
    state,
    editingNote,
    setEditNote,
    setEditingNote,
    deleteNote,
    saveEdited,
  } = notesContext;

  return (
    <div className="the-note-box">
      <h4>Nota tomada em - {date}</h4>
      <div className="note-text">
        {state.id !== id && (
          <>
            {console.log(state.id === id, state.id, id)}
            <div className="icons">
              <FaEdit
                className="icon-margin"
                id={id}
                onClick={() => {
                  editingNote ? setEditingNote(id) : setEditingNote(id);
                }}
              />
              <FaRegTrashAlt
                className="red"
                data-id={id}
                onClick={deleteNote}
              />{" "}
            </div>
            <div className="the-text">
              <p>{note}</p>
            </div>
          </>
        )}
        {state.id === id && (
          <div className="form">
            {console.log(state.id === id, state.id, id)}
            <textarea
              data-date={date}
              onChange={(e) => {
                setEditNote({
                  date: e.target.getAttribute("data-date"),
                  id: parseInt(e.target.id),
                  note: e.target.value,
                });
              }}
              id={id}
              cols="50"
              rows="3"
              autoFocus
              defaultValue={note}
            ></textarea>
            <button onClick={saveEdited}>salvar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TheNote;
