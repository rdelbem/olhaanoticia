import React, { useReducer } from "react";
import NavContext from "./NavContext";
import NavReducer from "./NavReducer";
import { HOME_ROUTE, LATER_ROUTE, NOTES_ROUTE } from "../types";

export default function NavState(props) {
  const initialState = null;
  const [state, dispatch] = useReducer(NavReducer, initialState);

  const home = () => dispatch({ type: HOME_ROUTE, payload: "home" });
  const later = () => dispatch({ type: LATER_ROUTE, payload: "later" });
  const notes = () => dispatch({ type: NOTES_ROUTE, payload: "notes" });

  return (
    <NavContext.Provider
      value={{
        state,
        home,
        later,
        notes,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
}
