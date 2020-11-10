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
import Alert from "../alerts/Alert";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const MainContainer = styled.div`
  height: 95vh;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Main = () => {
  const { alerts } = useContext(AlertContext);
  const { isAuthorized, user, getUser, checkToken } = useContext(AuthContext);
  const [isUserChecked, setUserChecked] = useState(false);

  // try to check user on every page load
  useEffect(() => {
    if (!user) {
      getUser().finally(() => setUserChecked(true));
    }
  }, []);

  return (
    isUserChecked && (
      <MainContainer>
        <Navbar />
        {alerts && <Alert />}
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
          {isAuthorized ? (
            <Redirect to={`/list/${user.public_url}`} />
          ) : (
            <Route children={<PublicHome />} />
          )}
        </Switch>
      </MainContainer>
    )
  );
};

export default Main;
