import { SET_IS_AUTHORISED, SET_USER_ID } from "../types";

const authReducer = (state, action) => {
  switch (action) {
    case SET_IS_AUTHORISED:
      return {
        ...state,
        isAuthorised: action.payload,
      };

    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
