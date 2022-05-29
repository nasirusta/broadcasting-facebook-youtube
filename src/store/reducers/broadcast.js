import { SET_BROADCAST } from "../types";

const default_state = {
  broadcastList: [],
  error: null,
};

const broadcastReducer = (state = default_state, action) => {
  switch (action.type) {
    case SET_BROADCAST:
      return { ...state, broadcastList: action.payload };
    default:
      return state;
  }
};

export default broadcastReducer;
