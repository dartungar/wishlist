import React from "react";
import styled from "styled-components";
import { fadein } from "../../style/animations";
import SearchBox from "../search/SearchBox";
import SearchResultList from "../search/SearchResultList";

const PublicHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  margin-bottom: 0.4rem;
`;

const SubHeader = styled.p`
  margin-top: 0;
  font-size: 1.1rem;
`;

const GreetingTextContainer = styled.p`
  margin: 7rem 0 2rem 0;
`;

const PublicHome = () => {
  return (
    <PublicHomeContainer>
      <GreetingTextContainer>
        <a href="/login">Войдите</a> или{" "}
        <a href="/register">зарегистрируйтесь</a>, чтобы создать свой список
        желаний, или найдите списки друзей:
      </GreetingTextContainer>
      <SearchBox />
      <SearchResultList />
    </PublicHomeContainer>
  );
};

export default PublicHome;
