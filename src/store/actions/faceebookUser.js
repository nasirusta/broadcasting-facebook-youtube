import { SET_FACEBOOK_USER } from "../types";

export const faceebookUser = (response) => (dispatch) => {
  dispatch({ type: SET_FACEBOOK_USER, payload: response });
};
