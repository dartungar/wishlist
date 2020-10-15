import {
  SET_LOADING,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
  SET_ITEMS,
  CLEAR_ITEMS,
} from "../types.js";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_ADDING_NEW_ITEM:
      return {
        ...state,
        addingNewItem: action.payload,
      };
    case SET_EDITED_ITEM:
      return {
        ...state,
        editedItem: action.payload,
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        addingNewItem: false,
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
