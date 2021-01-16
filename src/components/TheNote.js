import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function TheNote(props) {
  const [notes, setNotes] = props.notesState;
  const { date, id, note } = props;
  const [editingNote, setEditingNote] = useState(false);
  const [editNote, setEditNote] = useState({});

  const findAndReplaceNote = (arrayInput, _id, replacement) => {
    let indexRemoved = 0;
    let replacedObj;

    let filteredItems = arrayInput.filter((item, index) => {
      let newArray = item.id !== _id;
      if (item.id === _id) indexRemoved = index;
      replacedObj = item;
      return newArray;
    });

    if (
      replacedObj.note !== replacement.note &&
      replacement.hasOwnProperty("note")
    ) {
      filteredItems.splice(indexRemoved, 0, replacement);
      return filteredItems;
    }
  };

  const saveEdited = (e) => {
    e.preventDefault();
    setEditingNote(false);
    let editedArrayOfNotes = findAndReplaceNote(notes, editNote.id, editNote);
    if (!!editedArrayOfNotes) {
      setNotes(editedArrayOfNotes);
      localStorage.setItem("notes", JSON.stringify(editedArrayOfNotes));
    }
  };

  const deleteNote = (e) => {
    setEditingNote(false);
    const noteId = e.target.getAttribute("data-id");
    let notesAfterDelete = notes.filter((note) => {
      return note.id !== parseInt(noteId);
    });
    setNotes(notesAfterDelete);
    localStorage.setItem("notes", JSON.stringify(notesAfterDelete));
  };

  return (
    <div className="the-note-box">
      <h4>Nota tomada em - {date}</h4>
      <div className="note-text">
        {!editingNote && (
          <>
            <div className="icons">
              <FaEdit
                className="icon-margin"
                id={id}
                onClick={() => {
                  editingNote ? setEditingNote(false) : setEditingNote(true);
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
        {editingNote && (
          <div className="form">
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
