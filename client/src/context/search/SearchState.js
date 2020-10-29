import React, { useReducer } from "react";
import searchContext from "./searchContext";
import searchReducer from "./searchReducer";
import { SET_SEARCH_RESULTS } from "../types";

const SearchState = (props) => {
  const initialState = {
    searchResults: [],
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // set search results
  const setSearchResults = (results) => {
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
  };

  // make search request to API
  const search = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/search?q=${query}`
      );
      const unparsed_results = await response.json();
      const results = unparsed_results.map((r) => JSON.parse(r));
      console.log("results:", results);
      return results;
    } catch (error) {
      console.log("Error searching!", error);
    }
  };

  return (
    <searchContext.Provider
      value={{
        searchResults: state.searchResults,
        setSearchResults,
        search,
      }}
    >
      {props.children}
    </searchContext.Provider>
  );
};

export default SearchState;
