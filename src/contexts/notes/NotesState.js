import { useEffect, useReducer } from "react";
import NotesContext from "./NotesContext";
import NotesReducer from "./NotesReducer";
import {
  CLEAR_TEXT,
  SET_NOTE,
  SET_TEXT,
  EDITING_NOTE,
  EDIT_NOTE,
} from "../types";

export default function NotesState(props) {
  const initialState = {
    notes: [],
    editing: null,
    text: "",
  };
  const [state, dispatch] = useReducer(NotesReducer, initialState);

  const setTextArea = () => dispatch({ type: CLEAR_TEXT });
  const setTheText = (text) => dispatch({ type: SET_TEXT, payload: text });
  const setNotes = (content, storage) => {
    storage
      ? dispatch({
          type: SET_NOTE,
          payload: { notes: content, origin: "storage" },
        })
      : dispatch({
          type: SET_NOTE,
          payload: { notes: content, origin: "notSaved" },
        });
  };

  const verifyNotesStored = () => {
    if (!!localStorage.getItem("notes")) {
      let storedNotes = JSON.parse(localStorage.getItem("notes"));
      setNotes(storedNotes, true);
    }
  };

  useEffect(() => {
    verifyNotesStored();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (state.text !== undefined && state.text !== "") {
      let theNoteObj = {
        date: new Date().toLocaleDateString(),
        id: Math.floor(Math.random() * Math.floor(100000000)),
        note: state.text.trim(),
      };

      let noteArray = state.notes;
      noteArray.unshift(theNoteObj);

      setNotes(noteArray, false);
      setTextArea();
      setTheText("");

      let noteStringfied = JSON.stringify(state.notes);
      localStorage.setItem("notes", noteStringfied);
    }
  };

  //individual notes
  const setEditNote = (noteObj) =>
    dispatch({ type: EDIT_NOTE, payload: noteObj });
  const editNote = () => dispatch({ type: EDIT_NOTE });
  const setEditingNote = (noteId) => {
    dispatch({ type: EDITING_NOTE, payload: noteId });
  };

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
    setEditingNote(null);
    if (!!state.editedNote?.id) {
      let editedArrayOfNotes = findAndReplaceNote(
        state.notes,
        state.editedNote.id,
        state.editedNote
      );
      if (!!editedArrayOfNotes) {
        setNotes(editedArrayOfNotes, false);
        localStorage.setItem("notes", JSON.stringify(editedArrayOfNotes));
      }
    }
  };

  const deleteNote = (e) => {
    setEditingNote(false);
    const noteId = e.target.getAttribute("data-id");
    let notesAfterDelete = state.notes.filter((note) => {
      return note.id !== parseInt(noteId);
    });
    setNotes(notesAfterDelete);
    localStorage.setItem("notes", JSON.stringify(notesAfterDelete));
  };

  return (
    <NotesContext.Provider
      value={{
        state,
        setTextArea,
        handleSave,
        saveEdited,
        deleteNote,
        editNote,
        setEditingNote,
        setEditNote,
        setTheText,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
