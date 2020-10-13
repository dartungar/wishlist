import React from "react";
import styled from "styled-components";
import ItemsState from "./context/items/ItemsState";
import AuthState from "./context/auth/AuthState";
import Main from "./components/layout/Main";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min(100ch, 90%) 1fr;
  color: black;
  font-family: "Source Sans Pro", sans-serif;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Noto Serif", serif;
  }
`;

const App = () => {
  return (
    <AuthState>
      <ItemsState>
        <AppContainer>
          <div></div>
          <Main />
          <div></div>
        </AppContainer>
      </ItemsState>
    </AuthState>
  );
};

export default App;
