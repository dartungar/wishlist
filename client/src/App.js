import React from "react";
import styled, { ThemeProvider } from "styled-components";
import ItemsState from "./context/items/ItemsState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Main from "./components/layout/Main";
import { lightTheme } from "./style/themes";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min(100ch, 90%) 1fr;
  color: ${(props) => props.theme.TEXT};
  font-family: "Source Sans Pro", sans-serif;
  border-radius: 3px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Noto Serif", serif;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.TEXT};
  }

  a:hover {
    color: ${(props) => props.theme.PRIMARY};
    transition: color 0.2s;
  }

  input {
    font-family: "Source Sans Pro", sans-serif;
    padding: 0.3rem;
    border: 1px solid ${(props) => props.theme.PRIMARY_LIGHT};
    border-radius: 0px;

    /* box-shadow: 1px 1px 4px lightgray; */
  }

  input[type="text"],
  input[type="url"],
  input[type="number"] {
    border-top: none;
    border-left: none;
    border-right: none;
  }

  input:focus {
    outline: none;
    /* border: 1px solid ${(props) => props.theme.PRIMARY}; */
    border-color: ${(props) => props.theme.PRIMARY};
    transition: color 0.2s;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AlertState>
        <AuthState>
          <ItemsState>
            <AppContainer>
              <div></div>
              <Main />
              <div></div>
            </AppContainer>
          </ItemsState>
        </AuthState>
      </AlertState>
    </ThemeProvider>
  );
};

export default App;
