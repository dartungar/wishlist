import React, { useReducer, useContext } from "react";
import itemsContext from "./itemsContext";
import itemsReducer from "./itemsReducer";
import {
  SET_LOADING,
  SET_WISHLIST,
  SET_ADDING_NEW_ITEM,
  SET_EDITED_ITEM,
  SET_NEW_GIFTER_MODAL,
  SET_FAVORITE_USERS,
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
    favoriteUsers: null,
  };

  const [state, dispatch] = useReducer(itemsReducer, initialState);

  const { pushAlert } = useContext(alertContext);

  // set loading
  // determines if Spinner.js is shown
  const setLoading = (boolean) => {
    dispatch({ type: SET_LOADING, payload: boolean });
  };

  // toggle 'adding new item' state to show new item prompt
  const setAddingNewItem = (value) => {
    dispatch({ type: SET_ADDING_NEW_ITEM, payload: value });
  };

  // set item that's being currently edited
  // also toggles 'edit mode' for this item
  const setEditedItem = (item) => {
    dispatch({ type: SET_EDITED_ITEM, payload: item });
  };

  // show modal for adding new gifter (user clicks on 'will gift this' and is prompted for his name (optionally))
  const setNewGifterModal = (data) => {
    dispatch({ type: SET_NEW_GIFTER_MODAL, payload: data });
  };

  // get wishlist (items & user info) by user
  // used on every page update (adding, deleting, editing items)
  // to refresh displayed info
  // public
  const getWishlist = async (user_public_url) => {
    setLoading(true);
    try {
      const usr_response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/users?public_url=${user_public_url}`
      );
      if (usr_response.ok) {
        const user = await usr_response.json();
        const items = await getItems(user.id);
        const wishlist = { user, items };
        if (user) {
          dispatch({ type: SET_WISHLIST, payload: wishlist });
        } else
          pushAlert({
            type: "danger",
            text:
              "Ошибка при загрузке списка: не найден владелец списка. Попробуйте перезагрузить страницу",
            time: 5000,
          });
      } else {
        pushAlert({
          type: "danger",
          text:
            "Ошибка при загрузке списка: ошибка при загрузке данных о владельце списка",
          time: 5000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при загрузке списка",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ITEMS */

  // get current user's wishlist items
  // used in getWishlist
  // public
  const getItems = async (user_id = state.currentWishlist.user.id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/users/${user_id}/items`
      );
      if (response.ok) {
        let unparsed_items = await response.json();
        let items = unparsed_items.map((i) => JSON.parse(i));
        return items;
      } else {
        pushAlert({
          type: "danger",
          text: "Ошибка при загрузке записей в списке",
          time: 3000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при загрузке записей в списке",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // add item in current user's wishlist
  // protected
  const addItem = async (user = state.user, item) => {
    setLoading(true);
    let completeItem = {
      ...item,
      user_id: user.id,
    };
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/items`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeItem),
        }
      );
      if (response.ok) {
        getWishlist(user.public_url);
        pushAlert({
          type: "success",
          text: "Запись успешно добавлена",
          time: 3000,
        });
      } else {
        pushAlert({
          type: "danger",
          text: "Ошибка при добавлении",
          time: 3000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при добавлении",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // update item by ID. used in in current user's wishlist
  // protected
  const updateItem = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/items/${item.id}`,
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
        pushAlert({
          type: "success",
          text: "Изменения сохранены",
          time: 3000,
        });
      } else {
        pushAlert({
          type: "danger",
          text: "Ошибка при сохранении изменений",
          time: 3000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при сохранении изменений",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // update only item's gifters
  // public
  const updateItemGifters = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/items/${item.id}/update_gifters`,
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
        pushAlert({
          type: "success",
          text: `Записал вас дарителем`,
          time: 3000,
        });
      } else {
        pushAlert({
          type: "danger",
          text: "Не удалось записать вас дарителем",
          time: 3000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Не удалось записать вас дарителем",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // delete item from current user's wishlist
  // protected
  const deleteItem = async (item_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/items/${item_id}`,
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
      } else {
        pushAlert({
          type: "danger",
          text: "Ошибка при удалении",
          time: 3000,
        });
      }
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при удалении",
        time: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  /* FAVORITE USERS */

  // get favorite users
  // protected
  const getFavoriteUsers = async (current_user_id) => {
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/users/${current_user_id}/favorites`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        const favorites = data.map((u) => JSON.parse(u));
        dispatch({ type: SET_FAVORITE_USERS, payload: favorites });
      } else if (response.status === 401) {
        pushAlert({
          type: "danger",
          text: "Ошибка авторизации при получении списка избранных",
          time: 3000,
        });
      } else throw new Error("Ошибка при получении списка избранных");
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при получении списка избранных",
        time: 3000,
      });
    }
  };

  // add favorite user
  // protected
  const addFavoriteUser = async (current_user_id, favorite_user_id) => {
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/users/${current_user_id}/favorites`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: favorite_user_id }),
        }
      );
      if (response.ok) {
        getFavoriteUsers(current_user_id);
      } else if (response.status === 401) {
        pushAlert({
          type: "danger",
          text: "Ошибка авторизации при добавлении пользователя в избранные",
        });
      } else throw new Error("Ошибка при добавлении пользователя в избранные");
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при добавлении пользователя в избранные",
      });
    }
  };

  // remove user from favorites
  // protected
  const removeFavoriteUser = async (current_user_id, favorite_user_id) => {
    try {
      const response = await fetch(
        `${
          process.env.NODE_ENV === "development" ? "http://localhost:5000" : ""
        }/api/users/${current_user_id}/favorites`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: favorite_user_id }),
        }
      );
      if (response.ok) {
        getFavoriteUsers(current_user_id);
      } else if (response.status === 401) {
        pushAlert({
          type: "danger",
          text: "Ошибка авторизации при удалении пользователя из избранных",
        });
      } else throw new Error("Ошибка при удалении пользователя из избранных");
    } catch (error) {
      pushAlert({
        type: "danger",
        text: "Ошибка при удалении пользователя из избранных",
      });
    }
  };

  // used to determine state of 'add/remove to/from favorites'
  // button near username on other's wishlists
  const checkIfUserIsInFavorites = (user_id) => {
    let isInFavoriteUsers = false;
    state.favoriteUsers.map((fu) => {
      if (fu.id === user_id) {
        isInFavoriteUsers = true;
      }
    });
    return isInFavoriteUsers;
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
        favoriteUsers: state.favoriteUsers,
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
        getFavoriteUsers,
        addFavoriteUser,
        removeFavoriteUser,
        checkIfUserIsInFavorites,
      }}
    >
      {props.children}
    </itemsContext.Provider>
  );
};

export default ItemsState;
