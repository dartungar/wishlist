import React from "react";
import styled from "styled-components";

const CancelBtnContainer = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND};
  border: none;
  font-size: 1rem;
  i {
    color: ${(props) => props.theme.DANGER};
  }
  i:hover {
    color: ${(props) => props.theme.DANGER_DARK};
  }
`;

const CancelBtn = ({ title, onClick }) => {
  return (
    <CancelBtnContainer
      onClick={(e) => {
        console.log("cancelling!");
        onClick(e);
      }}
      title={title ? title : "Отмена"}
    >
      <i className="fas fa-times"></i>
    </CancelBtnContainer>
  );
};

export default CancelBtn;
