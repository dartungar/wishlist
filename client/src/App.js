import React from "react";
import styled from "styled-components";
import List from "./components/list/List";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: beige;
  color: black;
`;

const App = () => {
  return (
    <AppContainer>
      <div></div>
      <List />
      <div></div>
    </AppContainer>
  );
};

export default App;
