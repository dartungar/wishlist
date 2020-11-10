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
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: SET_USER, payload: data });
        dispatch({ type: SET_IS_AUTHORIZED, payload: true });
      } else if (response.status === 401) {
        dispatch({ type: SET_USER, payload: null });
        dispatch({ type: SET_IS_AUTHORIZED, payload: false });
        // if status = 401, we did not provide token
        // else there was a legit error
      } else {
        pushAlert({
          type: "danger",
          text:
            "Ошибка авторизации. Пожалуйста, перезагрузите страницу и попробуйте снова",
        });
      }
    } catch (error) {
      console.log(error);
      pushAlert({
        type: "danger",
        text:
          "Ошибка соединения с сервером. Пожалуйста, перезагрузите страницу и попробуйте снова",
      });
    }
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
        text: "Пользователь не найден. Вы зарегистрировались?",
      });
    } else {
      console.log("Login error: ", responseText);
      pushAlert({
        type: "danger",
        text:
          "Ошибка авторизации. Пожалуйста, перезагрузите страницу и попробуйте снова",
      });
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
      pushAlert({
        type: "info",
        text: "Не забудьте установить дату рождения!",
      });
      pushAlert({
        type: "success",
        text:
          "Добро пожаловать в WishLis! Создайте список желаний или найдите друзей.",
      });
    } else {
      const errorText = await response.text();
      console.log("Registration error", errorText);
      pushAlert({
        type: "danger",
        text:
          "Ошибка при регистрации. Пожалуйста, перезагрузите страницу и попробуйте снова",
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
        text:
          "Ошибка при выходе из учетной записи. Пожалуйста, перезагрузите страницу и попробуйте снова",
      });
    }
  };

  // change user info, i.e name
  const changeUserInfo = async (data) => {
    console.log("changing user info...");
    // TODO
    const response = await fetch(`http://localhost:5000/api/users/${data.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      pushAlert({ type: "success", text: "Изменения сохранены" });
      getUser(); // refresh shown name
    } else {
      const responseText = await response.text();
      console.log(responseText);
      pushAlert({ type: "danger", text: "Ошибка при сохранении изменений" });
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        user: state.user,
        getUser,
        login,
        register,
        logout,
        changeUserInfo,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
