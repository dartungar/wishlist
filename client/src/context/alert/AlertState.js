import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { PUSH_ALERT, POP_ALERT, REMOVE_ALERT } from "../types";
import { v4 as uuid4 } from "uuid";

const AlertState = (props) => {
  const initialState = {
    alerts: [],
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // add alert
  // to alerts stack
  const pushAlert = (alert) => {
    console.log("push alert...");
    const alertData = {
      ...alert,
      id: uuid4(),
    };
    dispatch({ type: PUSH_ALERT, payload: alertData });
    setTimeout(() => removeAlertByID(alertData.id), alert.hideAfterMs || 7000);
  };

  // clear the newest alert
  const popAlert = () => {
    console.log("pop alert...");
    dispatch({ type: POP_ALERT });
  };

  // remove alert by ID
  const removeAlertByID = (id) => {
    console.log("removing alert...");
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state.alerts,
        pushAlert,
        popAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
