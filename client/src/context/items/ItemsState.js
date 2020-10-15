import React, { useReducer } from "react";
import { v4 as uuid4 } from "uuid";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import {
  SET_LOADING,
  SET_ITEMS,
  SET_WISHLIST,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
} from "../types.js";

const ItemsState = (props) => {
  const initialState = {
    currentWishlist: {
      user: {},
      items: [],
    },
    loading: false,
    addingNewItem: false,
    editedItem: null,
  };

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // toggle 'adding new item' state to show new item prompt
  const setAddingNewItem = (value) => {
    dispatch({ type: SET_ADDING_NEW_ITEM, payload: value });
  };

  // set item that's being currently edited
  const setEditedItem = (item) => {
    console.log("setting edited item: ", item);
    dispatch({ type: SET_EDITED_ITEM, payload: item });
  };

  // get wishlist (items & user info) by user
  const getWishlist = async (user_id) => {
    console.log("getting wishlist...");
    setLoading();
    try {
      const usr_response = await fetch(
        `http://localhost:3005/users?id=${user_id}`
      );

      if (usr_response.ok) {
        const users = await usr_response.json();
        const user = users[0];
        const items = getItems(user_id);
        const wishlist = { user, items };
        dispatch({ type: SET_WISHLIST, payload: wishlist });
      } else {
        console.log(`request to get items failed with ${usr_response.status}`);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // get current user's wishlist items
  const getItems = async (user_id = state.currentWishlist.user.id) => {
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
  const updateItem = async (user = state.user, item) => {
    console.log(`updating item ${item} in ${user}'s wishlist...`);
    try {
      const response = await fetch(`http://localhost:3005/items/${item.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        console.log("updated item!");
        dispatch({ type: SET_EDITED_ITEM, payload: null });
        getItems(user.id);
      } else {
        console.log("item was not updated", response.status);
      }
    } catch (error) {
      throw new Error(error);
    }
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
        items: state.items,
        currentWishlist: state.currentWishlist,
        addingNewItem: state.addingNewItem,
        editedItem: state.editedItem,
        setLoading,
        setAddingNewItem,
        setEditedItem,
        getItems,
        getWishlist,
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
