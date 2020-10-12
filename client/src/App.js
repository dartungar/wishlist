import React from "react";
import styled from "styled-components";
import Main from "./components/layout/Main";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min(100ch, 100%) 1fr;
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
    <AppContainer>
      <div></div>
      <Main />
      <div></div>
    </AppContainer>
  );
};

export default App;
