import { LIVE_CHANGE } from "../types";

export const broadcastLive = (id,state) => (dispatch) => {
    dispatch({ type: LIVE_CHANGE, payload:state,id:id });
};
