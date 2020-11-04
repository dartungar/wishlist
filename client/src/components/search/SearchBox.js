import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchContext from "../../context/search/searchContext";

const SearchBoxContainer = styled.div`
  position: relative;
  input {
    border: 1px solid ${(props) => props.theme.PRIMARY_LIGHT};
    border-radius: 3px;
    width: 45ch;
  }
`;

const SubmitBtn = styled.button`
  position: absolute;
  /* right: 1.7rem; */
  right: 0.1rem;
  background-color: ${(props) => props.theme.BACKGROUND};
  border: none;
  font-size: 1rem;
  i {
    color: ${(props) => props.theme.PRIMARY};
  }
  i:hover {
    color: ${(props) => props.theme.TEXT};
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
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Поиск по имени, фамилии, id - от 2 символов"
        />
        <SubmitBtn type="submit" title="Найти по имени, фамилии, id">
          <i class="fas fa-search"></i>
        </SubmitBtn>
      </form>
    </SearchBoxContainer>
  );
};

export default SearchBox;
