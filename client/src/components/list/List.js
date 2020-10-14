import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Item from "./Item";
import AddNewItemBtn from "./AddNewItemBtn";
import NewItemPrompt from "./NewItemPrompt";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const ListContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const testItem = {
  name: "Офигенно нужная штукенция, которую я сам себе никогда бы не купил",
  price: "3000 Р",
  url: "https://www.ozon.ru/context/detail/id/167083349/",
};

const List = () => {
  const { items, getItems, addingNewItem } = useContext(ItemsContext);
  const { isAuthorised, user } = useContext(AuthContext);

  useEffect(() => {
    getItems(user.id);
  }, []);

  return (
    <ListContainer>
      {addingNewItem ? <NewItemPrompt /> : <AddNewItemBtn />}
      {items && items.map((item) => <Item key={item.id} item={item} />)}
    </ListContainer>
  );
};

export default List;
