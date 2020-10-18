import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import List from "../list/List";
import Profile from "../user/Profile";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Search from "./Search";
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
  const { isAuthorised, user } = useContext(AuthContext);
  return (
    <Router>
      <MainContainer>
        <Navbar />
        {alert && <Alert />}
        <Switch>
          <Route path="/list/:user_id" children={<List />} />
          <Route exact path="/profile" children={<Profile />} />
          <Route exact path="/login">
            {isAuthorised ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {isAuthorised ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/search" children={<Search />} />
          {isAuthorised ? (
            <Route path="/" children={<List show_my_wishlist="true" />} />
          ) : (
            <Route path="/search" children={<Search />} />
          )}
        </Switch>
      </MainContainer>
    </Router>
  );
};

export default Main;
