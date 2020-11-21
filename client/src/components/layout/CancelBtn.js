import React from "react";
import styled from "styled-components";

const CancelBtnContainer = styled.button`
  border: none;
  font-size: 1rem;
  i {
    color: ${(props) => props.theme.DANGER};
  }
  i:hover {
    color: ${(props) => props.theme.DANGER_DARK};
  }

  background-color: ${(props) =>
    props.background ? props.theme[props.background] : props.theme.BACKGROUND};
`;

const CancelBtn = ({ title, onClick, background }) => {
  return (
    <CancelBtnContainer
      onClick={(e) => {
        onClick(e);
      }}
      title={title ? title : "Отмена"}
      background={background}
    >
      <i className="fas fa-times"></i>
    </CancelBtnContainer>
  );
};

export default CancelBtn;
