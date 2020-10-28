import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 100%;
  }
`;

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
  box-shadow: 1px 1px 4px lightgray;

  button {
    background-color: ${(props) => props.theme.BACKGROUND};
    border: none;
    font-size: 1rem;
  }
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

const CancelBtn = styled.button`
  i {
    color: ${(props) => props.theme.DANGER};
  }
  i:hover {
    color: ${(props) => props.theme.DANGER_DARK};
  }
`;

const SaveBtn = styled.button`
  i {
    color: ${(props) => props.theme.SUCCESS};
  }
  i:hover {
    color: ${(props) => props.theme.SUCCESS_DARK};
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

  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    updateEditedItemValue({
      ...editedItemValue,
      [e.target.name]: value,
    });
  };

  const onCancel = () => {
    setEditedItem(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateItem(editedItemValue);
    getWishlist(user.id);
  };

  if (!editedItemValue) return null;

  return (
    <EditItemContainer onSubmit={onSubmit}>
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
        <CancelBtn onClick={onCancel} title="Отмена">
          <i className="fas fa-times"></i>
        </CancelBtn>
        <SaveBtn type="submit" title="Сохранить">
          <i className="fas fa-check"></i>
        </SaveBtn>
      </BtnsContainer>
    </EditItemContainer>
  );
};

export default EditItemPrompt;
