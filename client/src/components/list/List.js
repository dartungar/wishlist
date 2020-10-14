import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Item from "./Item";
import AddNewItemBtn from "./AddNewItemBtn";
import NewItemPrompt from "./NewItemPrompt";
import EditItemPrompt from "./EditItemPrompt";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const ListContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const List = () => {
  const { items, getItems, addingNewItem, editedItem } = useContext(
    ItemsContext
  );
  const { isAuthorised, user } = useContext(AuthContext);

  useEffect(() => {
    getItems(user.id);
  }, []);

  return (
    <ListContainer>
      {addingNewItem ? <NewItemPrompt /> : <AddNewItemBtn />}
      {items &&
        items.map((item) => {
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
