import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import shortid from "shortid";
import { SET_IS_AUTHORISED } from "../types";

const AuthState = (props) => {
  const initialState = {
    isAuthorised: true, // TODO: make default false after implementing auth
    user: {
      id: "1BeRbZgI",
      name: "Daniel Nikolaev",
    }, // TODO: make null default
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // register user
  const register = () => {
    console.log("register user");
  };
  // authenticate user
  const login = () => {
    console.log("log user in");
  };

  // log out
  const logout = () => {
    console.log("log user out");
  };

  // change user info, i.e name
  const changeUserInfo = (newInfo) => {
    console.log("changing user info...");
  };

  return (
    <authContext.Provider
      value={{
        isAuthorised: state.isAuthorised,
        user: state.user,
        register,
        login,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
