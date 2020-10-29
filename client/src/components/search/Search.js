import React from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15%;
  height: 100%;
`;

const Search = () => {
  return (
    <SearchContainer>
      <h4>Поиск пользователей</h4>
      <SearchBox />
      <SearchResultList />
    </SearchContainer>
  );
};

export default Search;
