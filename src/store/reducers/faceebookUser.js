import { SET_FACEBOOK_USER } from "../types";

const default_state = {
  fbUser: null,
  error: "",
};

const faceebookUserReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_FACEBOOK_USER:
      return { ...state, fbUser: action.payload };
    default:
      return state;
  }
};

export default faceebookUserReducer;
