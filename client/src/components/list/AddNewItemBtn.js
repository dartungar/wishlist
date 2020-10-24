import React, { useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";

const BtnContainer = styled.div`
  margin-left: auto;
  margin-right: 0rem;
  padding: 5px;
  color: ${(props) => props.theme.TEXT_LIGHT};
  font-size: 0.8rem;
  width: 12ch;
  border: 1px solid ${(props) => props.theme.BACKGROUND};
  border-radius: 3px;

  &:hover {
    background-color: ${(props) => props.theme.BACKGROUND};
    /* border-color: ${(props) => props.theme.PRIMARY_LIGHT}; */
    box-shadow: 1px 1px 4px darkgrey;
    transition: box-shadow 0.3s;
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
