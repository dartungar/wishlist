import { PUSH_ALERT, POP_ALERT, REMOVE_ALERT } from "../types";

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
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id !== action.payload),
      };
    default:
      return state;
  }
};

export default alertReducer;
