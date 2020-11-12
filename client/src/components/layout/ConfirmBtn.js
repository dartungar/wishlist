import React from "react";
import styled from "styled-components";

const ConfirmBtnContainer = styled.button`
  border: none;
  font-size: 1rem;
  i {
    color: ${(props) => props.theme.SUCCESS};
  }
  i:hover {
    color: ${(props) => props.theme.SUCCESS_DARK};
  }

  background-color: ${(props) =>
    props.background ? props.theme[props.background] : props.theme.BACKGROUND};
`;

const ConfirmBtn = ({ title, onClick, background }) => {
  return (
    <ConfirmBtnContainer
      onClick={(e) => onClick(e)}
      title={title ? title : "Применить"}
      background={background}
    >
      <i className="fas fa-check"></i>
    </ConfirmBtnContainer>
  );
};

export default ConfirmBtn;
