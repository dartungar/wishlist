import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import PrivateRoute from "../auth/PrivateRoute";
import Navbar from "./Navbar";
import List from "../list/List";
import Profile from "../user/Profile";
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
  const { alert } = useContext(AlertContext);
  const { isAuthorized, authorize, user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      authorize();
    }
  }, []);

  return (
    <Router>
      <MainContainer>
        <Navbar />
        {alert && <Alert />}
        <Switch>
          <Route path="/list/:user_public_url" children={<List />} />
          <PrivateRoute path="/profile" component={Profile} />
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
    </Router>
  );
};

export default Main;
