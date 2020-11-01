import { PUSH_ALERT, POP_ALERT } from "../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case PUSH_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case POP_ALERT:
      return {
        ...state,
        alerts: state.alerts.slice(0, -1),
      };
    default:
      return state;
  }
};

export default alertReducer;
