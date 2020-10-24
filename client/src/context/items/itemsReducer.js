import {
  SET_LOADING,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
  SET_WISHLIST,
  SET_ITEMS_ERROR,
  SET_NEW_GIFTER_MODAL,
} from "../types.js";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_WISHLIST:
      return {
        ...state,
        currentWishlist: action.payload,
        loading: false,
        addingNewItem: false,
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

    case SET_NEW_GIFTER_MODAL:
      return {
        ...state,
        newGifterModal: action.payload,
      };
    case SET_ITEMS_ERROR:
      return {
        ...state,
        itemsError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default itemsReducer;
