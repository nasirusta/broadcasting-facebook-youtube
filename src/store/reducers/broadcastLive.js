import { LIVE_STATE, LIVE_CHANGE } from "../types";
import update from "react-addons-update"; // ES6

const default_state = {
  broadcastList: [],
  error: null,
};

const broadcastLiveReducer = (state = default_state, action) => {
  switch (action.type) {
    case LIVE_STATE:
      return { ...state, broadcastList: action.payload };
    case LIVE_CHANGE:
      return update(state, {
        broadcastList: {
          [action.id]: {
            live: { $set: action.payload },
          },
        },
      });
    default:
      return state;
  }
};

export default broadcastLiveReducer;
