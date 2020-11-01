import React, { useReducer, useContext } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SET_IS_AUTHORIZED, SET_USER } from "../types";
import AlertContext from "../alert/alertContext";

const AuthState = (props) => {
  const initialState = {
    // isAuthorized: true, // TODO: make default false after implementing auth
    // user: {
    //   id: "1BeRbZgI",
    //   name: "Daniel Nikolaev",
    // }, // TODO: make null default
    isAuthorized: false,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // using Alerts context
  const { pushAlert } = useContext(AlertContext);

  // authorize: check token & set isAuthorized and current user
  // used on every page reload
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/user`, {
      method: "GET",
      credentials: "include",
      withCredentials: "true",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: SET_USER, payload: data });
      dispatch({ type: SET_IS_AUTHORIZED, payload: true });
    } else if (response.status === 401) {
      dispatch({ type: SET_USER, payload: null });
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
      // if status = 401, it means we did not provide token
      // else there was legit error
    } else {
      pushAlert({ type: "danger", text: "Authorization error" });
    }
  };

  // refresh token
  // TODO
  const refreshToken = async () => {
    // TODO: if error, set user & is authorized to null
  };

  // general login
  const login = async (data) => {
    // TODO
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(data),
    });
    const responseText = await response.text();
    if (response.status === 200) {
      console.log("Logged in! Getting user...", responseText);
      getUser();
    } else if (response.status === 204) {
      console.log("User not found ", responseText);
      pushAlert({
        type: "info",
        text: "Could not find user. Please register.",
      });
    } else {
      console.log("Login error: ", responseText);
      pushAlert({ type: "danger", text: "Error logging in" });
    }
  };

  // register
  const register = async (data) => {
    const response = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      login(data);
      pushAlert({ type: "success", text: "Welcome to wishlist!" });
    } else {
      const errorText = await response.text();
      console.log("Registration error", errorText);
      pushAlert({
        type: "danger",
        text: "Error registering. Try refreshing page",
      });
    }
  };

  // log out
  const logout = async () => {
    console.log("log user out");
    const response = await fetch(`http://localhost:5000/api/auth/logout`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      dispatch({ type: SET_USER, payload: false });
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
    } else {
      pushAlert({
        type: "danger",
        text: "Error logging out. Try refreshing page",
      });
    }
  };

  // change user info, i.e name
  const changeUserInfo = (newInfo) => {
    console.log("changing user info...");
    // TODO
  };

  return (
    <authContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        user: state.user,
        login,
        register,
        logout,
        getUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
