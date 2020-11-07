import React from "react";
import styled from "styled-components";
import { fadein } from "../../style/animations";
import ConfirmBtn from "./ConfirmBtn";
import CancelBtn from "./CancelBtn";

const DarkenedBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(252, 255, 255, 0.6);
`;

const DialogWindowContainer = styled.div`
  z-index: 200;
  max-width: 80%;
  background-color: ${(props) => props.theme.BACKGROUND};
  border-radius: 3px;
  padding: 1rem;
  animation: 0.5s ${fadein} linear;
  box-shadow: 1px 1px 4px lightgray;
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DialogWindow = ({ text, onConfirm, onCancel }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onConfirm(e);
    } else if (e.key === "Escape") {
      onCancel(e);
    }
  };
  return (
    <DarkenedBackground>
      <DialogWindowContainer onKeyDown={handleKeyDown}>
        <p>{text}</p>
        <BtnsContainer>
          <CancelBtn onClick={onCancel} />
          <ConfirmBtn onClick={onConfirm} />
        </BtnsContainer>
      </DialogWindowContainer>
    </DarkenedBackground>
  );
};

export default DialogWindow;