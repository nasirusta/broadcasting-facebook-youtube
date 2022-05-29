import { SET_FACEBOOK_PAGES } from "../types";

const default_state = {
  fbPages: [],
  error: "",
};

const faceebookPagesReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_FACEBOOK_PAGES:
      return { ...state, fbPages: action.payload };
    default:
      return state;
  }
};

export default faceebookPagesReducer;
