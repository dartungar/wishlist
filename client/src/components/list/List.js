import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
import AddNewItemBtn from "./AddNewItemBtn";
import NewItemPrompt from "./NewItemPrompt";
import EditItemPrompt from "./EditItemPrompt";
import ListTitle from "./ListTitle";
import Spinner from "../layout/Spinner";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const ListContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const List = ({ show_my_wishlist }) => {
  const {
    loading,
    currentWishlist,
    getItems,
    getWishlist,
    addingNewItem,
    editedItem,
  } = useContext(ItemsContext);
  const { isAuthorised, user } = useContext(AuthContext);
  const { user_id } = useParams();

  useEffect(() => {
    console.log("will get wishlist for user id: ", user_id);
    if (user_id) {
      getWishlist(user_id);
    } else if (show_my_wishlist) {
      console.log("show my wishlist");
      getWishlist(user.id);
    }
  }, [user_id]);

  if (loading) {
    return <Spinner />;
  } else
    return (
      <ListContainer>
        <ListTitle user={currentWishlist.user} />

        {addingNewItem ? <NewItemPrompt /> : <AddNewItemBtn />}
        {currentWishlist.items.length > 0 &&
          currentWishlist.items.map((item) => {
            if (editedItem && item.id === editedItem.id) {
              return <EditItemPrompt key={item.id} item={editedItem} />;
            } else {
              return <Item key={item.id} item={item} />;
            }
          })}
      </ListContainer>
    );
};

export default List;
