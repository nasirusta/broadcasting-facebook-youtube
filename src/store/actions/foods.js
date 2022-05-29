import { UPDATE_FOOD } from "../types";

export const foods = () => (dispatch) => {
  dispatch({ type: UPDATE_FOOD, payload: "Home" });
};
