import React, { useReducer, useContext } from "react";
import searchContext from "./searchContext";
import searchReducer from "./searchReducer";
import { SET_SEARCH_RESULTS } from "../types";
import AlertContext from "../alert/alertContext";

const SearchState = (props) => {
  const initialState = {
    searchResults: null,
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { pushAlert } = useContext(AlertContext);
  // const { pushAlert } = alertContext;

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
      if (response.ok) {
        const unparsed_results = await response.json();
        const results = unparsed_results.map((r) => JSON.parse(r));
        console.log("results:", results);
        return results;
      } else if (response.status === 400) {
        pushAlert({
          type: "info",
          text: `Для поиска нужно > 2 символов. Вы искали "${query}", этого мало.`,
        });
      } else {
        pushAlert({
          type: "danger",
          text:
            "Ошибка при поиске. Попробуйте еще раз или перезагрузите страницу",
        });
      }
    } catch (error) {
      console.log("Error searching!", error);
      pushAlert({
        type: "danger",
        text:
          "Ошибка при поиске. Попробуйте еще раз или перезагрузите страницу",
      });
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
