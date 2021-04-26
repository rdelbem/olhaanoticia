import {
  CLEAR_TEXT,
  SET_TEXT,
  SET_NOTE,
  EDITING_NOTE,
  EDIT_NOTE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAR_TEXT:
      return {
        ...state,
        textarea: "",
      };
    case SET_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case SET_NOTE:
      //even though they look the same, the actual payload is different, that's why both must be kept separate
      if (action.payload.origin === "notSaved") {
        return {
          notes: [...action.payload.notes],
        };
      }
      if (action.payload.origin === "storage") {
        return {
          notes: [...action.payload.notes],
        };
      }
    case EDITING_NOTE:
      return {
        ...state,
        id: action.payload,
      };
    case EDIT_NOTE:
      return {
        ...state,
        editedNote: action.payload,
      };

    default:
      return state;
  }
};
