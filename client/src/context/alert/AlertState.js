import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { PUSH_ALERT, POP_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = {
    alerts: [],
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // set alert
  const pushAlert = (alert) => {
    console.log("push alert...");
    dispatch({ type: PUSH_ALERT, payload: alert });
  };

  // clear alert
  const popAlert = () => {
    console.log("pop alert...");
    dispatch({ type: POP_ALERT });
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
