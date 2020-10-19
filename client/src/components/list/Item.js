import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #fcffff;
  animation: 0.5s ${fadein} linear;
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
  width: 9ch;
`;

const UrlContainer = styled.div`
  margin: 1rem 0 1rem 1rem;
`;

const PublicBtnsContainer = styled.div`
  margin: 1rem;
  /* margin: 1rem; */
  i {
    margin-left: 0.1rem;
  }
`;

const PrivateButtonsContainer = styled.div`
  margin: 1rem 1rem 1rem auto;
  /* margin: 1rem; */
  i {
    margin-left: 1rem;
  }
`;

const Item = ({ item }) => {
  const { setEditedItem, updateItem, deleteItem } = useContext(ItemsContext);
  const { user, isAuthorised } = useContext(AuthContext);
  const { id, name, price, url, bookers, group_purchase } = item;

  const onEdit = (e) => {
    e.preventDefault();
    setEditedItem(item);
  };

  // TODO: update item with bookers set to null
  const onClearBookers = (e) => {
    e.preventDefault();

    const itemWithClearedBookers = {
      ...item,
      bookers: null,
    };
    updateItem(user, itemWithClearedBookers);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log("want to delete");
    deleteItem(id);
  };

  return (
    <ItemContainer>
      <NameContainer>
        <p>{name}</p>
      </NameContainer>
      <PriceContainer>{price} ₽</PriceContainer>
      <UrlContainer>
        <a href={url} title="посмотреть подробности">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </UrlContainer>
      <PublicBtnsContainer title="Буду дарить">
        {group_purchase ? (
          <i class="fas fa-users"></i>
        ) : (
          <i class="fas fa-gift"></i>
        )}
      </PublicBtnsContainer>
      <PrivateButtonsContainer>
        <a href="" onClick={onEdit} title="Редактировать">
          <i class="fas fa-edit"></i>
        </a>
        <a href="" onClick={onClearBookers} title="Очистить дарителей">
          <i class="fas fa-user-times"></i>
        </a>

        <a href="" onClick={onDelete} title="Удалить">
          <i class="fas fa-trash-alt"></i>
        </a>
      </PrivateButtonsContainer>
    </ItemContainer>
  );
};

export default Item;
