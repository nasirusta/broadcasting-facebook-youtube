import { UPDATE_FOOD } from "../types";

const default_state = {
  allFoods: "jk",
  error: "",
};

const foodReducer = (state = default_state, action) => {
  switch (action.type) {
    case UPDATE_FOOD:
      return { ...state, allFoods: action.payload };
    default:
      return state;
  }
};

export default foodReducer;
