import React, { useReducer, useContext } from "react";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import {
  SET_LOADING,
  SET_WISHLIST,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
  SET_NEW_GIFTER_MODAL,
} from "../types.js";
import alertContext from "../alert/alertContext";

const ItemsState = (props) => {
  const initialState = {
    currentWishlist: {
      user: {},
      items: [],
    },
    loading: false,
    addingNewItem: false,
    editedItem: null,
    newGifterModal: null,
  };

  const [state, dispatch] = useReducer(itemsReducer, initialState);

  const { pushAlert } = useContext(alertContext);

  // set loading
  const setLoading = (boolean) => {
    dispatch({ type: SET_LOADING, payload: boolean });
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
  const getWishlist = async (user_public_url) => {
    console.log("getting wishlist...");
    setLoading(true);
    try {
      const usr_response = await fetch(
        `http://localhost:5000/api/users?public_url=${user_public_url}`
      );
      if (usr_response.ok) {
        const user = await usr_response.json();
        const items = await getItems(user.id);
        const wishlist = { user, items };
        console.log(wishlist);
        if (user) {
          dispatch({ type: SET_WISHLIST, payload: wishlist });
        } else
          pushAlert({
            type: "danger",
            text: "Error loading wishlist: could not find wishlist owner",
          });
      } else {
        console.log(`request to get wishlist failed with ${usr_response.text}`);
        pushAlert({
          type: "danger",
          text: "Error loading wishlist: error finding user",
        });
      }
    } catch (error) {
      console.log(`getting wishlist failed: ${error}`);
      pushAlert({ type: "danger", text: "Error loading wishlist" });
    } finally {
      setLoading(false);
    }
  };

  // get current user's wishlist items
  // used in getWishlist
  const getItems = async (user_id = state.currentWishlist.user.id) => {
    console.log("getting items...");
    setLoading(true);
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
        pushAlert({ type: "danger", text: "Error loading wishlist items" });
      }
    } catch (error) {
      console.log(`getting wishlist failed: ${error}`);
      pushAlert({ type: "danger", text: "Error loading wishlist items" });
    } finally {
      setLoading(false);
    }
  };

  // add item in current user's wishlist
  const addItem = async (user = state.user, item) => {
    setLoading(true);
    let completeItem = {
      ...item,
      user_id: user.id,
    };
    console.log("will add new item for ", user);
    try {
      const response = await fetch(`http://localhost:5000/api/items`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeItem),
      });
      if (response.ok) {
        console.log("Added item!");
        getWishlist(user.public_url);
        pushAlert({ type: "success", text: "Added item" });
      } else {
        console.log("Failed to add item", JSON.stringify(completeItem));
        pushAlert({ type: "danger", text: "Error adding item" });
      }
    } catch (error) {
      console.log("Failed to add item", error);
      pushAlert({ type: "danger", text: "Error adding item" });
    } finally {
      setLoading(false);
    }
  };

  // update item in current user's wishlist
  const updateItem = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item.id}`,
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (response.ok) {
        console.log("updated item!");
        dispatch({ type: SET_EDITED_ITEM, payload: null });
        pushAlert({ type: "success", text: "Updated item" });
      } else {
        console.log("item was not updated", response.status);
        pushAlert({ type: "danger", text: "Error updating item" });
      }
    } catch (error) {
      pushAlert({ type: "danger", text: "Error updating item" });
    } finally {
      setLoading(false);
    }
  };

  // update only item's gifters
  const updateItemGifters = async (item) => {
    setLoading(true);
    console.log("stringified item: ", JSON.stringify(item));
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item.id}/update_gifters`,
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      if (response.ok) {
        dispatch({ type: SET_EDITED_ITEM, payload: null });
        pushAlert({ type: "success", text: `Записал вас дарителем` });
      } else {
        console.log("item was not updated", response.status);
        pushAlert({
          type: "danger",
          text: "Не удалось записать вас дарителем",
        });
      }
    } catch (error) {
      pushAlert({ type: "danger", text: "Не удалось записать вас дарителем" });
    } finally {
      setLoading(false);
    }
  };

  // delete item from current user's wishlist
  const deleteItem = async (item_id) => {
    setLoading(true);
    console.log(`deleting item ${item_id}...`);
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${item_id}`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("deleted item!");
      } else {
        pushAlert({ type: "danger", text: "Error deleting item" });
      }
    } catch (error) {
      pushAlert({ type: "danger", text: "Error deleting item" });
    } finally {
      setLoading(false);
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
        newGifterModal: state.newGifterModal,
        setLoading,
        setAddingNewItem,
        setEditedItem,
        getItems,
        getWishlist,
        addItem,
        updateItem,
        updateItemGifters,
        deleteItem,
        setNewGifterModal,
      }}
    >
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemsState;
