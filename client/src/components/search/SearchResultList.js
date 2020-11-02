import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SearchResultItem from "./SearchResultItem";
import SearchContext from "../../context/search/searchContext";

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

const SearchResultsContainer = styled.div`
  margin-top: 1rem;
`;

const NoResultContainer = styled.div`
  color: ${(props) => props.theme.TEXT_LIGHT};
  animation: 0.2s ${fadein} linear;
`;

const SearchResultList = () => {
  const { searchResults } = useContext(SearchContext);
  const [showNoResultMessage, setShowNoResultMessage] = useState();

  useEffect(() => {
    if (!showNoResultMessage && searchResults && searchResults.length === 0) {
      setShowNoResultMessage(true);
    } else setShowNoResultMessage(false);
  }, [searchResults]);

  return (
    <SearchResultsContainer>
      {searchResults &&
        searchResults.map((r) => <SearchResultItem result={r} key={r.id} />)}
      {showNoResultMessage && (
        <NoResultContainer>
          <p>did not find any users</p>
        </NoResultContainer>
      )}
    </SearchResultsContainer>
  );
};

export default SearchResultList;
