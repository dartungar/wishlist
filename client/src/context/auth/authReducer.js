import { SET_IS_AUTHORIZED, SET_USER, SET_LOADING_AUTH } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.payload,
        isLoadingAuth: false,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoadingAuth: false,
      };
    case SET_LOADING_AUTH:
      return {
        ...state,
        isLoadingAuth: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
