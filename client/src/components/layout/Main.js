import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import List from "../list/List";
import Profile from "../user/Profile";
import AuthContext from "../../context/auth/authContext";

const MainContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Main = () => {
  return (
    <Router>
      <MainContainer>
        <Navbar />
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
