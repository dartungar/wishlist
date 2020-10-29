import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchContext from "../../context/search/searchContext";

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  input {
    border: 1px solid;
    width: 30ch;
  }
`;

const SearchBox = () => {
  const { search, setSearchResults } = useContext(SearchContext);
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    search(query).then((results) => setSearchResults(results));
  };

  return (
    <SearchBoxContainer>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={query} onChange={onChange} />
      </form>
    </SearchBoxContainer>
  );
};

export default SearchBox;
