import { HOME_ROUTE, LATER_ROUTE, NOTES_ROUTE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case HOME_ROUTE:
    case LATER_ROUTE:
    case NOTES_ROUTE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
