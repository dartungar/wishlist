import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import { fadein } from "../../style/animations";
import CancelBtn from "../layout/CancelBtn";
import ConfirmBtn from "../layout/ConfirmBtn";

const EditItemContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  /* border: 1px solid #b1dff2; */
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
    margin: 3px 0.5rem auto auto;
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
    console.log("Submitted", e.key, editedItemValue);
    // if data didnt change, do not send request
    if (editedItemValue.name && editedItemValue.price) {
      if (!shallowEqual(editedItemValue, item)) {
        updateItem(editedItemValue);
        getWishlist(user.public_url);
      } else setEditedItem(null);
    }
  };

  // compare objects by prop values
  const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
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
        required
      ></PriceInput>
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
