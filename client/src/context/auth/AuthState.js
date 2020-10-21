import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import shortid from "shortid";
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

  // set error message so the alert will be shown
  const setAuthError = (text) => {
    dispatch({ type: SET_AUTH_ERROR, payload: text });
  };

  // authorize: check token & set isAuthorized and current user
  const authorize = async () => {
    let token = getToken();
    console.log("token:", token);
    let user = token ? await getUserFromToken(token) : null;
    let isAuthorized = token && user ? true : false;
    dispatch({ type: SET_USER, payload: user });
    dispatch({ type: SET_IS_AUTHORIZED, payload: isAuthorized });
  };

  // create encrypted token with user data
  const createToken = (userData) => {
    let tokenObj = { userId: userData.id };
    let encryptedToken = btoa(JSON.stringify(tokenObj));
    return encryptedToken;
  };

  // set token in local storage
  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  // get token from local storage
  const getToken = () => {
    try {
      let token = localStorage.getItem("token");
      return token;
    } catch (error) {
      setAuthError("Error getting token");
    }
  };

  // get user data from encrypted token
  const getUserFromToken = async (token) => {
    let decryptedToken = atob(token);
    let userId = JSON.parse(decryptedToken).userId;
    let user = await getUserByID(userId);
    return user;
  };

  // log in with google
  const googleLogin = async (googleID) => {
    const user = await getUserByGoogleID(googleID);

    if (user) {
      console.log("Logging in with Google ID", googleID, user);
      setToken(createToken(user));
      authorize(user);
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

  // log in with facebook
  const facebookLogin = async (facebookID) => {
    const user = await getUserByFacebookID(facebookID);

    if (user) {
      console.log("Logging in with Facebook", facebookID, user);
      setToken(createToken(user));
      authorize(user);
      console.log("logged in with Facebook");
    } else setAuthError("User not found. Please register.");
  };

  // register new user after auth with facebook
  const facebookRegister = async (facebookResponse) => {
    const { name, id } = facebookResponse;
    const user = await getUserByFacebookID(id);
    if (user) {
      facebookLogin(id);
    } else {
      const newUser = {
        id: shortid(),
        name,
        facebookID: id,
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
        facebookLogin(id);
      } else setAuthError("Error registering user");
    }
  };

  // log out
  const logout = () => {
    console.log("log user out");
    dispatch({ type: SET_USER, payload: false });
    dispatch({ type: SET_IS_AUTHORIZED, payload: false });
    localStorage.removeItem("token");
  };

  // change user info, i.e name
  const changeUserInfo = (newInfo) => {
    console.log("changing user info...");
    // TODO
  };

  // find user by ID
  const getUserByID = async (id) => {
    const response = await fetch(`http://localhost:3005/users?id=${id}`);
    if (response.ok) {
      const data = await response.json();
      const user = data[0];
      return user;
    } else return null;
  };

  // find user by Google ID
  // TODO: encrypt Google ID
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

  // find user by Facebook ID
  // TODO: same as Google ID
  const getUserByFacebookID = async (facebookID) => {
    const response = await fetch(
      `http://localhost:3005/users?facebookID=${facebookID}`
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
        isAuthorized: state.isAuthorized,
        user: state.user,
        authError: state.authError,
        googleLogin,
        facebookLogin,
        authorize,
        googleRegister,
        facebookRegister,
        logout,
        setAuthError,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
