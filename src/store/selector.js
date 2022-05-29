import { createSelector } from "reselect";

export const faceebookUsertMemo = createSelector(
  (state) => state.faceebookUser.fbUser,
  (faceebookUser) => {
    return faceebookUser;
  }
);

export const faceebookPagesMemo = createSelector(
  (state) => state.faceebookPages.fbPages,
  (faceebookPages) => {
    return faceebookPages;
  }
);

export const broadcastMemo = createSelector(
  (state) => state.broadcast,
  (broadcast) => {
    console.log("Broadcast: ", broadcast);
    return broadcast;
  }
);

export const broadcastLiveMemo = createSelector(
  (state) => state.broadcastLive,
  (broadcastLive) => {
    console.log("Live: ", broadcastLive);
    return broadcastLive;
  }
);
