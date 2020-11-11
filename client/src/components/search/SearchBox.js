import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchContext from "../../context/search/searchContext";
import AlertContext from "../../context/alert/alertContext";

const SearchBoxContainer = styled.div`
  position: relative;
  input {
    border: 1px solid ${(props) => props.theme.PRIMARY_LIGHT};
    border-radius: 3px;
    width: 45ch;
    height: 1.5rem;
  }
`;

const SubmitBtn = styled.button`
  position: absolute;
  /* right: 1.7rem; */
  top: 0.5rem;
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
  const { pushAlert } = useContext(AlertContext);
  const [query, setQuery] = useState("");

  // controlled component change handling
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  // perform search query
  // query must be > 2 chars long
  const onSubmit = (e) => {
    e.preventDefault();
    if (query.length > 2) {
      search(query).then((results) => setSearchResults(results));
    } else {
      pushAlert({
        type: "info",
        text: `Для поиска нужно > 2 символов. Вы искали "${query}", этого мало.`,
      });
    }
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
          <i className="fas fa-search"></i>
        </SubmitBtn>
      </form>
    </SearchBoxContainer>
  );
};

export default SearchBox;
