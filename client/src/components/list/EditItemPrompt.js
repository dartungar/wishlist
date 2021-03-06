import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import { fadein } from "../../style/animations";
import CancelBtn from "../layout/CancelBtn";
import ConfirmBtn from "../layout/ConfirmBtn";
import { shallowEqual } from "../../helpers/shallowEqual";

const EditItemContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.BACKGROUND};
  animation: 0.5s ${fadein} linear;
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};
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

const EditItemPrompt = ({ item }) => {
  const { updateItem, setEditedItem, getWishlist } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [editedItemValue, updateEditedItemValue] = useState();

  useEffect(() => {
    updateEditedItemValue(item);
  }, [item]);

  // controlled input change handling
  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateEditedItemValue({
      ...editedItemValue,
      [e.target.name]: value,
    });
  };

  // cance 'edit' mode
  const onCancel = (e) => {
    e.preventDefault();
    setEditedItem(null);
  };

  // apply chages and cancel 'edit' mode
  const onSubmit = (e) => {
    e.preventDefault();
    // if data didnt change, do not send request
    if (editedItemValue.name) {
      if (!shallowEqual(editedItemValue, item)) {
        updateItem(editedItemValue);
        getWishlist(user.public_url);
      } else setEditedItem(null);
    }
  };

  // support Enter and ESC
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    } else if (e.key === "Escape") {
      onCancel(e);
    }
  };

  if (!editedItemValue) return null;

  return (
    <EditItemContainer onSubmit={onSubmit} onKeyDown={handleKeyDown}>
      <TextInput
        type="text"
        name="name"
        title="Название"
        placeholder="Название вещи"
        value={editedItemValue.name}
        onChange={onChange}
        required
        autoFocus
      ></TextInput>
      <UrlInput
        type="url"
        name="url"
        title="Ссылка на товар"
        placeholder="Ссылка"
        value={editedItemValue.url}
        onChange={onChange}
      ></UrlInput>
      <PriceInput
        type="number"
        name="price"
        title="Цена"
        placeholder="Цена"
        value={editedItemValue.price}
        onChange={onChange}
      ></PriceInput>
      <CurrencyContainer> ₽</CurrencyContainer>

      <IsGroupPurchaseInput>
        <input
          type="checkbox"
          name="group_purchase"
          checked={editedItemValue.group_purchase}
          onChange={onChange}
        ></input>{" "}
        можно вскладчину
      </IsGroupPurchaseInput>
      <BtnsContainer>
        <CancelBtn onClick={onCancel} />
        <ConfirmBtn type="submit" onClick={onSubmit} />
      </BtnsContainer>
    </EditItemContainer>
  );
};

export default EditItemPrompt;
