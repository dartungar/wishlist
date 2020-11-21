import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { PUSH_ALERT, CHANGE_ALERT_DATA, REMOVE_ALERT } from "../types";
import { v4 as uuid4 } from "uuid";

const AlertState = (props) => {
  const initialState = {
    alerts: [],
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // add alert
  // to alerts stack
  const pushAlert = (alert) => {
    const alertData = {
      ...alert,
      id: uuid4(),
      display: true,
    };
    dispatch({ type: PUSH_ALERT, payload: alertData });
    setTimeout(() => removeAlert(alertData), alert.time || 7000);
  };

  const changeAlertData = (alert) => {
    dispatch({ type: CHANGE_ALERT_DATA, payload: alert });
  };

  // remove alert by ID
  const removeAlert = (alert) => {
    changeAlertData({
      ...alert,
      display: false,
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: alert }), 200);
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state.alerts,
        pushAlert,
        removeAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
