import React, { useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #fcffff;

  a {
    text-decoration: none;
    color: black;
  }
`;

const NameContainer = styled.div`
  width: 100%;
  margin: 0 1rem;
`;

const PriceContainer = styled.div`
  margin: 1rem;
`;

const UrlContainer = styled.div`
  margin: 1rem 0 1rem 1rem;
`;

const PublicBtnsContainer = styled.div`
  margin: 1rem;
  /* margin: 1rem; */
`;

const PrivateButtonsContainer = styled.div`
  margin: 1rem 1rem 1rem auto;
  /* margin: 1rem; */
  i {
    margin-left: 1rem;
  }
`;

const Item = ({ item }) => {
  const { setEditedItem, deleteItem } = useContext(ItemsContext);
  const { id, name, price, url, bookers } = item;

  const onEdit = (e) => {
    e.preventDefault();
    setEditedItem(item);
  };

  const onClearBookers = (e) => {
    e.preventDefault();
    // TODO: update item with bookers set to null
  };

  const onDelete = () => {
    console.log("want to delete");
    deleteItem(id);
  };

  return (
    <ItemContainer>
      <NameContainer>
        <p>{name}</p>
      </NameContainer>
      <PriceContainer>{price}</PriceContainer>
      <UrlContainer>
        <a href={url} title="посмотреть подробности">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </UrlContainer>
      <PublicBtnsContainer>
        <i class="fas fa-gift"></i>
      </PublicBtnsContainer>
      <PrivateButtonsContainer>
        <a href="" onClick={onEdit}>
          <i class="fas fa-edit"></i>
        </a>
        <a href="" onClick={onClearBookers}>
          <i class="fas fa-user-times"></i>
        </a>

        <a href="" onClick={onDelete}>
          <i class="fas fa-trash-alt"></i>
        </a>
      </PrivateButtonsContainer>
    </ItemContainer>
  );
};

export default Item;
