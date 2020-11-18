import React, { useReducer, useContext } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SET_IS_AUTHORIZED, SET_USER } from "../types";
import AlertContext from "../alert/alertContext";

const AuthState = (props) => {
  const initialState = {
    isAuthorized: false,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // using Alerts context to show messages
  const { pushAlert } = useContext(AlertContext);

  // authorize: check token & set isAuthorized and current user
  // used on every page reload
  // protected
  const getUser = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL || "http://localhost:5000"}/api/auth/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );
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
          hideAfterMs: 5000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text:
          "Ошибка соединения с сервером. Пожалуйста, перезагрузите страницу и попробуйте снова",
        hideAfterMs: 5000,
      });
    }
  };

  // login & authenticate
  // public
  const login = async (data) => {
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:5000"}/api/auth/login`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.status === 200) {
      getUser();
    } else if (response.status === 204) {
      pushAlert({
        type: "info",
        text: "Пользователь не найден. Вы зарегистрировались?",
        hideAfterMs: 10000,
      });
    } else {
      pushAlert({
        type: "danger",
        text:
          "Ошибка авторизации. Пожалуйста, перезагрузите страницу и попробуйте снова",
        hideAfterMs: 5000,
      });
    }
  };

  // register
  // public
  const register = async (data) => {
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:5000"}/api/auth/register`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      login(data);
      pushAlert({
        type: "info",
        text: 'Не забудьте установить дату рождения в "Настройках"!',
        hideAfterMs: 45000,
      });
      pushAlert({
        type: "success",
        text:
          "Добро пожаловать в WishLis! Создайте список желаний или найдите друзей.",
        hideAfterMs: 15000,
      });
    } else {
      const errorText = await response.text();
      pushAlert({
        type: "danger",
        text:
          "Ошибка при регистрации. Пожалуйста, перезагрузите страницу и попробуйте снова",
        hideAfterMs: 5000,
      });
    }
  };

  // log out
  // protected
  const logout = async () => {
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:5000"}/api/auth/logout`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    if (response.ok) {
      dispatch({ type: SET_USER, payload: false });
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
    } else {
      pushAlert({
        type: "danger",
        text:
          "Ошибка при выходе из учетной записи. Пожалуйста, перезагрузите страницу и попробуйте снова",
        hideAfterMs: 5000,
      });
    }
  };

  // change user info, i.e name
  // protected
  const changeUserInfo = async (data) => {
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:5000"}/api/users/${data.id}`,
      {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      pushAlert({
        type: "success",
        text: "Изменения сохранены",
        hideAfterMs: 3000,
      });
      getUser(); // refresh shown name
    } else {
      const responseText = await response.text();
      pushAlert({
        type: "danger",
        text: "Ошибка при сохранении изменений",
        hideAfterMs: 5000,
      });
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
