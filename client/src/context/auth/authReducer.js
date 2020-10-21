import { SET_IS_AUTHORIZED, SET_USER, SET_AUTH_ERROR } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.payload,
        authError: null,
      };

    case SET_USER:
      console.log("setting user", action.payload);
      return {
        ...state,
        user: action.payload,
        authError: null,
      };

    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
