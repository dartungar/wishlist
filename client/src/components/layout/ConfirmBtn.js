import React from "react";
import styled from "styled-components";

const ConfirmBtnContainer = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND};
  border: none;
  font-size: 1rem;
  i {
    color: ${(props) => props.theme.SUCCESS};
  }
  i:hover {
    color: ${(props) => props.theme.SUCCESS_DARK};
  }
`;

const ConfirmBtn = ({ title, onClick }) => {
  return (
    <ConfirmBtnContainer
      onClick={(e) => onClick(e)}
      title={title ? title : "Применить"}
    >
      <i className="fas fa-check"></i>
    </ConfirmBtnContainer>
  );
};

export default ConfirmBtn;
