import React from "react";
import styled from "styled-components";
import ItemsState from "./context/items/ItemsState";
import AuthState from "./context/auth/AuthState";
import Main from "./components/layout/Main";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min(100ch, 90%) 1fr;
  color: #1a1c1c;
  font-family: "Source Sans Pro", sans-serif;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Noto Serif", serif;
  }

  input {
    font-family: "Source Sans Pro", sans-serif;
    padding: 0.3rem;
    border: 1px solid rgba(192, 237, 237, 0.5);
    border-radius: 3px;
    /* box-shadow: ; */
  }

  border-radius: 3px;

  input:focus {
    outline: none;
    border: 2px solid #c0eded;
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
