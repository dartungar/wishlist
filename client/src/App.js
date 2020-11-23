import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ItemsState from "./context/items/ItemsState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import SearchState from "./context/search/SearchState";
import Main from "./components/layout/Main";
import { lightTheme, darkTheme } from "./style/themes";
import "./App.css";

// global styles
const AppContainer = styled.div`
  display: grid;
  min-height: 100%;
  grid-template-columns: 1fr min(100ch, 90%) 1fr;
  color: ${(props) => props.theme.TEXT};
  font-family: "Source Sans Pro", sans-serif;
  border-radius: 3px;
  background-color: ${(props) => props.theme.BASIC_BACKGROUND};
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
    color: ${(props) => props.theme.TEXT};
    background-color: ${(props) => {
      if (props.basic_background) return props.theme.BASIC_BACKGROUND;
      else return props.theme.BACKGROUND;
    }};
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
  const [theme, setTheme] = useState();

  // get current theme from cookies
  // if none present, set based on preferred (system) color cheme
  useEffect(() => {
    const themeCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme"));
    const userTheme = themeCookie ? themeCookie.split("=")[1] : null;

    if (userTheme === "lightTheme") {
      setTheme(lightTheme);
    } else if (userTheme === "darkTheme") {
      setTheme(darkTheme);
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme(darkTheme);
      } else setTheme(lightTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={theme ? theme : lightTheme}>
      <AlertState>
        <SearchState>
          <AuthState>
            <ItemsState>
              <AppContainer>
                <div></div>
                <Router>
                  <Main />
                </Router>
                <div></div>
              </AppContainer>
            </ItemsState>
          </AuthState>
        </SearchState>
      </AlertState>
    </ThemeProvider>
  );
};

export default App;
