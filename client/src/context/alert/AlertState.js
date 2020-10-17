import React, { useReducer } from "react";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = {
    // alert: null,
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // set alert
  const setAlert = (alert) => {
    console.log("setting alert...");
    dispatch({ type: SET_ALERT, payload: alert });
  };

  // clear alert
  const clearAlert = () => {
    console.log("clearing alert...");
    dispatch({ type: CLEAR_ALERT });
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
        clearAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
