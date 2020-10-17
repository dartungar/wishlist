import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import List from "../list/List";
import Profile from "../user/Profile";
import Alert from "../alerts/Alert";
import AlertContext from "../../context/alert/alertContext";

const MainContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Main = () => {
  const { alert } = useContext(AlertContext);
  return (
    <Router>
      <MainContainer>
        <Navbar />
        {alert && <Alert />}
        <Switch>
          <Route path="/list/:user_id" children={<List />} />
          <Route exact path="/profile" children={<Profile />} />
          <Route path="/" children={<List show_my_wishlist="true" />} />
        </Switch>
      </MainContainer>
    </Router>
  );
};

export default Main;
