import React from "react";
import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

const SearchResultItemContainer = styled.div`
  /* width: 100%; */
  text-align: left;
  margin: 2rem 0;
  animation: 0.2s ${fadein} linear;

  i {
    margin-left: 1rem;
  }
`;

const SearchResutHeader = styled.h5`
  margin-bottom: 0rem;
  font-size: 95%;
`;

const SearchResultItem = ({ result: { name, public_url } }) => {
  return (
    <SearchResultItemContainer>
      <SearchResutHeader>{name}</SearchResutHeader>
      <p>
        {public_url}{" "}
        <a
          href={`/list/${public_url}`}
          title="открыть профиль в новой вкладке"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-external-link-alt"></i>
        </a>
      </p>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
