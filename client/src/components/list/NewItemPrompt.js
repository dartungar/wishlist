import React, { useState, useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import { fadein } from "../../style/animations";
import CancelBtn from "../layout/CancelBtn";
import ConfirmBtn from "../layout/ConfirmBtn";

const AddNewItemContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  /* border: 1px solid #b1dff2; */
  border-radius: 3px;
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};

  background-color: ${(props) => props.theme.BACKGROUND};
  animation: 0.5s ${fadein} linear;
`;

const TextInput = styled.input`
  width: 100%;
  margin: 1rem;
`;

const UrlInput = styled.input`
  width: 100%;
  margin: 0 1rem 1rem;
`;

const PriceInput = styled.input`
  margin: 0 1rem 1rem 1rem;
`;

const CurrencyContainer = styled.span`
  position: relative;
  bottom: 0.5rem;
`;
const BtnsContainer = styled.div`
  margin: 0 1rem 1rem auto;
  /* margin: 1rem; */
  i,
  div {
    margin-left: 1rem;
  }
`;

const IsGroupPurchaseInput = styled.div`
  margin: 0 1rem 1rem;
  input {
    position: relative;
    top: 2px;
    margin-right: 0.3rem;
  }
`;

const NewItemPrompt = () => {
  const { addItem, setAddingNewItem } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    url: "",
    group_purchase: false,
  });

  // controlled component change handling
  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewItem({
      ...newItem,
      [e.target.name]: value,
    });
  };

  // close 'add new item' prompt
  const onCancel = (e) => {
    e.preventDefault();
    setAddingNewItem(false);
  };

  // add new item (duh)
  const onSubmit = (e) => {
    e.preventDefault();
    if (newItem.name) {
      addItem(user, newItem);
    }
  };

  // Enter and ESC support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    } else if (e.key === "Escape") {
      onCancel(e);
    }
  };

  return (
    <AddNewItemContainer onSubmit={onSubmit} onKeyDown={handleKeyDown}>
      <TextInput
        type="text"
        name="name"
        title="Название"
        placeholder="Название вещи"
        value={newItem.name}
        onChange={onChange}
        required
        autoFocus
      ></TextInput>
      <UrlInput
        type="url"
        name="url"
        title="Ссылка на товар"
        placeholder="Ссылка на товар в магазине (необязательно)"
        value={newItem.url}
        onChange={onChange}
      ></UrlInput>
      <PriceInput
        type="number"
        name="price"
        title="Цена"
        placeholder="Цена"
        value={newItem.price}
        onChange={onChange}
      ></PriceInput>
      <CurrencyContainer> ₽</CurrencyContainer>
      <IsGroupPurchaseInput>
        <input
          type="checkbox"
          name="group_purchase"
          checked={newItem.group_purchase}
          onChange={onChange}
        ></input>{" "}
        можно вскладчину
      </IsGroupPurchaseInput>
      <BtnsContainer>
        <CancelBtn onClick={onCancel} />
        <ConfirmBtn type="submit" onClick={onSubmit} />
      </BtnsContainer>
    </AddNewItemContainer>
  );
};

export default NewItemPrompt;
