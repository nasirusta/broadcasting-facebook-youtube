import axios from "axios";
import { SET_BROADCAST, ERROR_BROADCAST, LIVE_STATE } from "../types";

export const broadcast =
  (
    id,
    token,
    pages,
    pageToken,
    streamKey,
    broadcastTitle,
    broadcastDescription
  ) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`https://graph.facebook.com/${id}/live_videos`, {
          status: "LIVE_NOW",
          title: broadcastTitle,
          description: broadcastDescription,
          access_token: token,
        })
        .then((response) => {
          dispatch({
            type: SET_BROADCAST,
            payload: [
              {
                pages: [
                  {
                    facebook: [
                      {
                        name: pages,
                        pageToken: pageToken,
                        pageId: id,
                      },
                    ],
                  },
                ],
                streamKey: streamKey,
                title: broadcastTitle,
                description: broadcastDescription,
                fbStreamData: response.data,
              },
            ],
          });
          dispatch({
            type: LIVE_STATE,
            payload: [
              {
                streamKey: streamKey,
                live: false,
              },
            ],
          });
          resolve(true);
        })
        .catch((error) => {
          dispatch({ type: ERROR_BROADCAST, payload: error });
          reject(false);
        });
    });
  };
