import { PUSH_ALERT, CHANGE_ALERT_DATA, REMOVE_ALERT } from "../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case PUSH_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case CHANGE_ALERT_DATA:
      return {
        ...state,
        alerts: state.alerts.map((a) => {
          if (a.id === action.payload.id) {
            return action.payload;
          }
          return a;
        }),
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default alertReducer;
