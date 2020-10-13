import React from "react";
import styled from "styled-components";

const BtnContainer = styled.div`
  margin-left: auto;
  margin-right: 0rem;
  padding: 5px;
  /* background-color: lightgrey; */
  color: #1f2120;
  font-size: 0.8rem;
  width: 12ch;
  border: 1px lightgrey solid;
  border-radius: 3px;
  &:hover {
    background-color: grey;
  }

  @media (max-width: 300px) {
    margin-right: auto;
  }
`;

const AddNewItemBtn = () => {
  return (
    <BtnContainer>
      <i class="fas fa-plus"></i>
      {"  "} Добавить
    </BtnContainer>
  );
};

export default AddNewItemBtn;
