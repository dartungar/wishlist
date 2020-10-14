import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const EditItemContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #fcffff;

  button {
    background-color: #fcffff;
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
    color: #733625;
  }
  i:hover {
    color: red;
  }
`;

const SaveBtn = styled.button`
  i {
    color: #2b6131;
  }
  i:hover {
    color: #5eb823;
  }
`;

const IsGroupPurchaseInput = styled.div`
  margin: 0 1rem 1rem;
  input {
    margin: 3px 0.5rem auto auto;
  }
`;

const EditItemPrompt = ({ item }) => {
  const { updateItem, getItems } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [editedItem, setEditedItem] = useState();

  console.log(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  console.log(editedItem);

  const onChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditedItem({
      ...editedItem,
      [e.target.name]: value,
    });
  };

  const onCancel = (e) => {
    e.preventDefault();
    setEditedItem(null);
    getItems(user.id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("saving edited item:", editedItem);
    updateItem(user, editedItem);
  };

  if (!editedItem) return null;

  return (
    <EditItemContainer onSubmit={onSubmit}>
      <TextInput
        type="text"
        name="name"
        title="Название"
        placeholder="Название вещи"
        value={editedItem.name}
        onChange={onChange}
        required
        autoFocus
      ></TextInput>
      <UrlInput
        type="url"
        name="url"
        title="Ссылка на товар"
        placeholder="Ссылка"
        value={editedItem.url}
        onChange={onChange}
      ></UrlInput>
      <PriceInput
        type="number"
        name="price"
        title="Цена"
        placeholder="Цена"
        value={editedItem.price}
        onChange={onChange}
        required
      ></PriceInput>
      <IsGroupPurchaseInput>
        <input
          type="checkbox"
          name="group_purchase"
          checked={editedItem.group_purchase}
          onChange={onChange}
        ></input>{" "}
        можно вскладчину
      </IsGroupPurchaseInput>

      <BtnsContainer>
        <CancelBtn onClick={onCancel} title="Отмена">
          <i class="fas fa-times"></i>
        </CancelBtn>
        <SaveBtn type="submit" title="Сохранить">
          <i class="fas fa-check"></i>
        </SaveBtn>
      </BtnsContainer>
    </EditItemContainer>
  );
};

export default EditItemPrompt;
