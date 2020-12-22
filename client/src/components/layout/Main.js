import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import PrivateRoute from "../auth/PrivateRoute";
import Navbar from "../navigation/Navbar";
import List from "../list/List";
import FavoritesList from "../favorites/FavoritesList";
import Settings from "../settings/Settings";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PublicHome from "../layout/PublicHome";
import Search from "../search/Search";
import Help from "./Help";
import Alert from "../alerts/Alert";
import Spinner from "./Spinner";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Main = () => {
  const { isAuthorized, user, getUser, isLoadingAuth } = useContext(
    AuthContext
  );
  const { pushAlert } = useContext(AlertContext);
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [triedToCheckUser, setTriedToCheckUser] = useState(false);

  // show alerts when going offline / online
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function handleOnline() {
    pushAlert({
      type: "success",
      text: `Соединение с интернетом восстановлено.`,
      time: 3000,
    });
  }

  function handleOffline() {
    pushAlert({
      type: "danger",
      text: `Нет интернет-соединения. Изменения не будут сохранены!`,
      time: 5000,
    });
  }

  // try to check user on every page load
  useEffect(() => {
    if (!user) {
      setTriedToCheckUser(true);
      getUser();
      setTriedToCheckUser(true);
    }
    // es-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && !isUserChecked && triedToCheckUser) {
      setIsUserChecked(true);
    }
  }, [isLoadingAuth]);

  return !isUserChecked ? (
    <Spinner />
  ) : (
    <MainContainer>
      <Navbar />
      <Alert />
      <Switch>
        <Route path="/list/:user_public_url" children={<List />} />
        <PrivateRoute path="/favorites" component={FavoritesList} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route exact path="/login">
          {isAuthorized ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {isAuthorized ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/search" children={<Search />} />
        <Route exact path="/help" children={<Help />} />
        {isAuthorized ? (
          <Redirect to={`/list/${user.public_url}`} />
        ) : (
          <Route children={<PublicHome />} />
        )}
      </Switch>
    </MainContainer>
  );
};

export default Main;
