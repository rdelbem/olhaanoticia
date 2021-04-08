import React, { useReducer, useEffect } from "react";
import NavContext from "./NavContext";
import NavReducer from "./NavReducer";
import { HOME_ROUTE, LATER_ROUTE, NOTES_ROUTE } from "../types";

export default function NavState(props) {
  const initialState = null;
  const [state, dispatch] = useReducer(NavReducer, initialState);

  const home = () => dispatch({ type: HOME_ROUTE, payload: "home" });
  const later = () => dispatch({ type: LATER_ROUTE, payload: "later" });
  const notes = () => dispatch({ type: NOTES_ROUTE, payload: "notes" });

  useEffect(() => {
    const currentUrl =
      window.location.href.replace("http://", "") ||
      window.location.href.replace("https://", "");
    let currentPage = currentUrl.replace(window.location.hostname, "");

    //This is a necessary step to evaluate on localhost =(
    const rgx = new RegExp(":3000");
    if (rgx.test(currentPage)) currentPage = currentPage.replace(":3000", "");

    //If state equals null we must evaluate if the user has hit refresh in order to place the correct page name on the header
    if (
      state === null &&
      currentPage !== "/" &&
      currentPage === "/for-later-news"
    )
      later();
    if (state === null && currentPage !== "/" && currentPage === "/notes")
      notes();
  }, []);

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
