import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import SearchResultItem from "./SearchResultItem";
import SearchContext from "../../context/search/searchContext";

const SearchResultsContainer = styled.div``;

const SearchResultList = () => {
  const { searchResults } = useContext(SearchContext);

  return (
    <SearchResultsContainer>
      {searchResults &&
        searchResults.map((r) => <SearchResultItem result={r} key={r.id} />)}
    </SearchResultsContainer>
  );
};

export default SearchResultList;
