import React, { useReducer } from "react";
import { v4 as uuid4 } from "uuid";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import {
  SET_LOADING,
  SET_WISHLIST,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
  SET_ITEMS_ERROR,
  SET_NEW_GIFTER_MODAL,
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
    itemsError: null,
    newGifterModal: null,
  };

  const [state, dispatch] = useReducer(itemsReducer, initialState);

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const setItemsError = (text) => {
    dispatch({ type: SET_ITEMS_ERROR, payload: text });
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

  // show modal for adding new gifter (user clicks on 'will gift this' and is prompted for his name (optionally))
  const setNewGifterModal = (data) => {
    dispatch({ type: SET_NEW_GIFTER_MODAL, payload: data });
  };

  // get wishlist (items & user info) by user
  // used on every page update (adding, deleting, editing items)
  const getWishlist = async (user_id) => {
    console.log("getting wishlist...");
    setLoading();
    try {
      const usr_response = await fetch(
        `http://localhost:5000/api/users?id=${user_id}`
      );

      if (usr_response.ok) {
        const user = await usr_response.json();
        const items = await getItems(user_id);
        const wishlist = { user, items };
        console.log(wishlist);
        if (user) {
          dispatch({ type: SET_WISHLIST, payload: wishlist });
        } else setItemsError("User not found!");
      } else {
        console.log(`request to get wishlist failed with ${usr_response.text}`);
        setItemsError("Error loading wishlist");
      }
    } catch (error) {
      console.log(`getting wishlist failed: ${error}`);
      setItemsError("Error loading wishlist");
    }
  };

  // get current user's wishlist items
  // used in getWishlist
  const getItems = async (user_id = state.currentWishlist.user.id) => {
    console.log("getting items...");
    setLoading();
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user_id}/items`
      );

      if (response.ok) {
        let unparsed_items = await response.json();
        console.log("fetched items: ", unparsed_items);
        let items = unparsed_items.map((i) => JSON.parse(i));
        return items;
      } else {
        console.log(`getting items failed: ${response.status}`);
        setItemsError("Error loading wishlist items");
      }
    } catch (error) {
      console.log(`getting wishlist failed: ${error}`);
      setItemsError("Error loading wishlist items");
    }
  };

  // add item in current user's wishlist
  const addItem = async (user = state.user, item) => {
    setLoading();

    let completeItem = {
      ...item,
      user_id: user.id,
    };
    try {
      const response = await fetch(`http://localhost:5000/api/items`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeItem),
      });
      if (response.ok) {
        console.log("Added item!");
        getWishlist(user.id);
      } else {
        // const res = await response.text();
        console.log("Failed to add item", completeItem);
        setItemsError("Error adding item");
      }
    } catch (error) {
      console.log("Failed to add item", error);
      setItemsError("Error adding item");
    }
  };

  // update item in current user's wishlist
  const updateItem = async (item) => {
    setLoading();

    // console.log(`updating item ${item} in ${user}'s wishlist...`);
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (response.ok) {
        console.log("updated item!");
        dispatch({ type: SET_EDITED_ITEM, payload: null });
      } else {
        console.log("item was not updated", response.status);
        setItemsError("Error while trying to load updated item");
      }
    } catch (error) {
      setItemsError("Error while trying to load updated item");
    }
  };

  // delete item from current user's wishlist
  const deleteItem = async (user_id, item_id) => {
    setLoading();

    console.log(`deleting item ${item_id}...`);
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item_id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("deleted item!");
        getWishlist(user_id);
      } else {
        setItemsError("Error deleting item");
      }
    } catch (error) {
      setItemsError("Error deleting item");
    }
  };

  return (
    <itemsContext.Provider
      value={{
        loading: state.loading,
        items: state.items,
        currentWishlist: state.currentWishlist,
        addingNewItem: state.addingNewItem,
        editedItem: state.editedItem,
        itemsError: state.itemsError,
        newGifterModal: state.newGifterModal,
        setLoading,
        setAddingNewItem,
        setEditedItem,
        getItems,
        getWishlist,
        addItem,
        updateItem,
        deleteItem,
        setItemsError,
        setNewGifterModal,
      }}
    >
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemsState;
