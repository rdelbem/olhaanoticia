import { HOME_ROUTE, LATER_ROUTE, NOTES_ROUTE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case HOME_ROUTE:
      return {
        ...state,
        page: "home",
      };
    case LATER_ROUTE:
      return {
        ...state,
        page: "later",
      };
    case NOTES_ROUTE:
      return {
        ...state,
        page: "notes",
      };

    default:
      return state;
  }
};
