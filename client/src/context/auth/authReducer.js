import { SET_IS_AUTHORIZED, SET_USER } from "../types";

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

    default:
      return state;
  }
};

export default authReducer;
