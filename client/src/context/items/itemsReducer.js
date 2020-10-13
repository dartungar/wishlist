import { SET_LOADING, SET_ITEMS, CLEAR_ITEMS } from "../types.js";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_ITEMS:
      console.log("setting items:", action.payload);
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case CLEAR_ITEMS:
      return {
        ...state,
        items: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default itemsReducer;
