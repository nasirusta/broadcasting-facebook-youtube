import axios from "axios";
import { SET_FACEBOOK_PAGES, SET_FACEBOOK_ERROR } from "../types";

export const faceebookPages =
  (id, token ) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${id}/accounts?fields=name,about,picture,access_token&access_token=${token}`,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      dispatch({ type: SET_FACEBOOK_PAGES, payload: response.data.data });
    } catch (err) {
      dispatch({ type: SET_FACEBOOK_ERROR, payload: err });
    }
  };
