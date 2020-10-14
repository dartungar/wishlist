import React, { useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";

const BtnContainer = styled.div`
  margin-left: auto;
  margin-right: 0rem;
  padding: 5px;
  /* background-color: lightgrey; */
  color: #1f2120;
  font-size: 0.8rem;
  width: 12ch;
  border-radius: 3px;
  &:hover {
    background-color: lightgrey;
  }
  i {
    margin-right: 0.3rem;
  }

  @media (max-width: 300px) {
    margin-right: auto;
  }

  cursor: pointer;
`;

const AddNewItemBtn = () => {
  const { setAddingNewItem } = useContext(ItemsContext);

  const onClick = () => {
    setAddingNewItem(true);
  };

  return (
    <BtnContainer onClick={onClick}>
      <i class="fas fa-plus"></i>
      {"   "} Добавить
    </BtnContainer>
  );
};

export default AddNewItemBtn;
