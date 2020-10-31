import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SET_IS_AUTHORIZED, SET_USER, SET_AUTH_ERROR } from "../types";

const AuthState = (props) => {
  const initialState = {
    // isAuthorized: true, // TODO: make default false after implementing auth
    // user: {
    //   id: "1BeRbZgI",
    //   name: "Daniel Nikolaev",
    // }, // TODO: make null default
    isAuthorized: false,
    user: null,
    authError: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // set error message
  // used in alerts
  const setAuthError = (text) => {
    dispatch({ type: SET_AUTH_ERROR, payload: text });
  };

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
    } else {
      dispatch({ type: SET_USER, payload: null });
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });

      // if status = 401, it means we did not provide token
      // else there was legit error
      if (response.status !== 401) {
        setAuthError("Authorization error");
      }
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
    if (response.status === 200) {
      const responseText = await response.text();
      console.log("Logged in! Getting user...", responseText);
      getUser();
    } else if (response.status === 204) {
      setAuthError("Could not find user. Please register.");
    } else {
      setAuthError("Authorization error. Please try again later.");
    }
  };

  // register
  const register = async (data) => {
    const response = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      login(data);
    } else {
      const errorText = await response.text();
      setAuthError("Error registering user", errorText);
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
      setAuthError("Error logging out. Try refreshing page");
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
        authError: state.authError,
        login,
        register,
        logout,
        getUser,
        setAuthError,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
