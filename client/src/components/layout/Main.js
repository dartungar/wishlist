import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import List from "../list/List";

const MainContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const Main = () => {
  return (
    <MainContainer>
      <Navbar />
      <List />
    </MainContainer>
  );
};

export default Main;
