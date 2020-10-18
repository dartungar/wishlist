import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import shortid from "shortid";
import { SET_IS_AUTHORISED, SET_USER, SET_AUTH_ERROR } from "../types";

const AuthState = (props) => {
  const initialState = {
    // isAuthorised: true, // TODO: make default false after implementing auth
    // user: {
    //   id: "1BeRbZgI",
    //   name: "Daniel Nikolaev",
    // }, // TODO: make null default
    isAuthorised: false,
    user: null,
    authError: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // set error message so the alert will be shown
  const setAuthError = (text) => {
    dispatch({ type: SET_AUTH_ERROR, payload: text });
  };

  // register user
  const register = () => {
    console.log("register user");
  };

  // authenticate user
  const login = () => {
    console.log("log user in");
  };

  // log in with google
  const googleLogin = async (googleID) => {
    const user = await getUserByGoogleID(googleID);
    if (user) {
      console.log("Logging in with Google ID", googleID, user);
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_IS_AUTHORISED, payload: true });
      console.log("logged in with Google ID!");
    } else setAuthError("User not found. Please register.");
  };

  const googleRegister = async (googleResponse) => {
    const { name, googleId } = googleResponse.profileObj;
    const user = await getUserByGoogleID(googleId);
    if (user) {
      googleLogin(googleId);
    } else {
      const newUser = {
        id: shortid(),
        name,
        googleID: googleId,
      };
      console.log("new user: ", newUser);
      const response = await fetch(`http://localhost:3005/users`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        googleLogin(googleResponse.googleId);
      } else setAuthError("Error registering user");
    }
  };

  // log out
  const logout = () => {
    console.log("log user out");
    dispatch({ type: SET_USER, payload: false });
    dispatch({ type: SET_IS_AUTHORISED, payload: false });
  };

  // change user info, i.e name
  const changeUserInfo = (newInfo) => {
    console.log("changing user info...");
  };

  // find user by Google ID
  // TODO: encrypt Google ID or find out best practice about
  // how to match Google ID to users in our DB
  const getUserByGoogleID = async (googleID) => {
    const response = await fetch(
      `http://localhost:3005/users?googleID=${googleID}`
    );
    if (response.ok) {
      const data = await response.json();
      const user = data[0];
      return user;
    } else return null;
  };

  return (
    <authContext.Provider
      value={{
        isAuthorised: state.isAuthorised,
        user: state.user,
        authError: state.authError,
        register,
        googleRegister,
        login,
        googleLogin,
        logout,
        setAuthError,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
