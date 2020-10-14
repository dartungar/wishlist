import React, { useReducer } from "react";
import { v4 as uuid4 } from "uuid";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import { SET_LOADING, SET_ITEMS, SET_ADDING_NEW_ITEM } from "../types.js";

const ItemsState = (props) => {
  const initialState = {
    currentListOwnerId: null,
    items: [],
    loading: false,
    addingNewItem: false,
  };

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // toggle 'adding new item' state to show new item prompt
  const setAddingNewItem = (value) => {
    dispatch({ type: SET_ADDING_NEW_ITEM, payload: value });
  };

  // set current user (whose wishlist we are viewing)
  const setCurrentListOwnerId = (user) => {
    console.log("setting current list owner");
  };

  // get current user's wishlist
  const getItems = async (user_id = state.currentListOwnerId) => {
    console.log("getting items...");
    setLoading();
    try {
      const response = await fetch(
        `http://localhost:3005/items?user_id=${user_id}`
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: SET_ITEMS, payload: data });
      } else {
        console.log(
          `request to wishlist to get items failed with ${response.status}`
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // add item in current user's wishlist
  const addItem = async (user = state.user, item) => {
    let completeItem = {
      id: uuid4(),
      ...item,
      user_id: user.id,
    };
    console.log(`adding item ${item} into ${user}'s wishlist...`);
    try {
      const response = await fetch(`http://localhost:3005/items`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeItem),
      });
      if (response.ok) {
        // TODO: alert on successful addition of item
        console.log("Added item!");
        getItems(user.id);
      } else {
        // TODO: alert on failing to add item
        console.log("Failed to add item!", response.statusText);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // update item in current user's wishlist
  const updateItem = (user = state.user, item) => {
    console.log(`updating item ${item} in ${user}'s wishlist...`);
  };

  // clear bookers from item
  const clearBookers = (item) => {
    console.log(`clearing bookers from ${item}`);
  };

  // delete item from current user's wishlist
  const deleteItem = async (id) => {
    console.log(`deleting item ${id}...`);
    try {
      const response = await fetch(`http://localhost:3005/items/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("deleted item!");
      } else {
        console.log("item was not deleted", response.status);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const [state, dispatch] = useReducer(itemsReducer, initialState);

  return (
    <itemsContext.Provider
      value={{
        currentListOwnerId: state.currentListOwnerId,
        items: state.items,
        addingNewItem: state.addingNewItem,
        setCurrentListOwnerId,
        setLoading,
        setAddingNewItem,
        getItems,
        addItem,
        updateItem,
        clearBookers,
        deleteItem,
      }}
    >
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemsState;
