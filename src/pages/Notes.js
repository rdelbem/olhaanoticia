import React, { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TheNote from "../components/TheNote";
import NotesContext from "../contexts/notes/NotesContext";

function Notes() {
  const notesContext = useContext(NotesContext);
  const { state, setTheText, handleSave } = notesContext;

  return (
    <div className="container">
      <div className="container-notes">
        <div className="form-div">
          <div>
            <textarea
              onChange={(e) => {
                setTheText(e.target.value.trim());
              }}
              cols="50"
              rows="3"
              placeholder="Escreva sua nota"
              value={state.text}
            ></textarea>
          </div>
          <div>
            <button onClick={handleSave}>Salvar nota</button>
          </div>
        </div>

        <div className="notes">
          {!!!state.notes.length && (
            <>
              <center>
                <h1>Suas notas aparecerão aqui!</h1>
              </center>
            </>
          )}
          <TransitionGroup>
            {state.notes.map((item, index) => (
              <CSSTransition key={index} timeout={300} classNames="item">
                <TheNote {...item} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default Notes;
