import React from "react";
import styled from "styled-components";

const SearchResultItemContainer = styled.div`
  /* width: 100%; */
  text-align: left;
`;

const SearchResultItem = ({ result: { name, public_url } }) => {
  return (
    <SearchResultItemContainer>
      <h5>
        {name} (<a href={`/list/${public_url}`}>{public_url}</a>)
      </h5>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
