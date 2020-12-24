import React, { useReducer, useContext } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SET_IS_AUTHORIZED, SET_USER, SET_LOADING_AUTH } from "../types";
import AlertContext from "../alert/alertContext";
import timeout from "../../helpers/timeout";

const AuthState = (props) => {
  const initialState = {
    isAuthorized: false,
    user: null,
    isLoadingAuth: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // using Alerts context to show messages
  const { pushAlert } = useContext(AlertContext);

  // authorize: check token & set isAuthorized and current user
  // used on every page reload
  // protected

  const getUser = async () => {
    dispatch({ type: SET_LOADING_AUTH, payload: true });
    timeout(
      5000,
      fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/auth/user`,
        {
          method: "GET",
          credentials: "include",
        }
      )
    )
      .then(async (response) => {
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
            time: 5000,
          });
        }
      })
      .catch((error) => {
        pushAlert({
          type: "danger",
          text: `Сервер недоступен. Пожалуйста, подождите минуту-две, а потом перезагрузите страницу.`,
          time: 5000,
        });
      })
      .finally(() => {
        dispatch({ type: SET_LOADING_AUTH, payload: false });
      });
  };

  // login & authenticate
  // public
  const login = async (data) => {
    const loginRequest = fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
      }/api/auth/login`,
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
    const response = await timeout(5000, loginRequest);
    if (response.status === 200) {
      getUser();
    } else if (response.status === 204) {
      register(data);
    } else {
      pushAlert({
        type: "danger",
        text:
          "Ошибка авторизации. Пожалуйста, перезагрузите страницу и попробуйте снова",
        time: 5000,
      });
    }
  };

  // register
  // public
  const register = async (data) => {
    const registerRequest = fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
      }/api/auth/register`,
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
    const response = await timeout(5000, registerRequest);
    if (response.ok) {
      login(data);
      pushAlert({
        type: "info",
        text: 'Не забудьте установить дату рождения в "Настройках"!',
        time: 45000,
      });
      pushAlert({
        type: "success",
        text:
          "Добро пожаловать в WishLis! Создайте список желаний или найдите друзей.",
        time: 15000,
      });
    } else {
      const errorText = await response.text();
      console.log(errorText);
      pushAlert({
        type: "danger",
        text:
          "Ошибка при регистрации. Пожалуйста, перезагрузите страницу и попробуйте снова",
        time: 5000,
      });
    }
  };

  // log out
  // public
  const logout = async () => {
    const logoutRequest = fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
      }/api/auth/logout`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const response = await timeout(5000, logoutRequest);
    if (response.ok) {
      dispatch({ type: SET_USER, payload: false });
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
    } else {
      pushAlert({
        type: "danger",
        text:
          "Ошибка при выходе из учетной записи. Пожалуйста, перезагрузите страницу и попробуйте снова",
        time: 5000,
      });
    }
  };

  // change user info, i.e name
  // protected
  const changeUserInfo = async (data) => {
    const response = await fetch(
      `${
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
      }/api/users/${data.id}`,
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
        time: 3000,
      });
      getUser(); // refresh shown name
    } else {
      const responseText = await response.text();
      pushAlert({
        type: "danger",
        text: "Ошибка при сохранении изменений",
        time: 5000,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthorized: state.isAuthorized,
        user: state.user,
        isLoadingAuth: state.isLoadingAuth,
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
