import React, { useRef, useEffect } from "react";
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
  background-color: rgba(102, 85, 60, 0.15);
`;

const DialogWindowContainer = styled.div`
  z-index: 200;
  max-width: 80%;
  background-color: ${(props) => props.theme.BACKGROUND};
  border-radius: 3px;
  padding: 1rem;
  animation: 0.5s ${fadein} linear;
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};
  :focus {
    outline: 1px solid ${(props) => props.theme.BACKGROUND};
  }
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DialogWindow = ({ text, onConfirm, onCancel }) => {
  const dialog = useRef(null);

  // focus element
  // so hotkeys work
  useEffect(() => {
    dialog.current.focus();
  }, []);

  // Enter and ESC support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onConfirm(e);
    } else if (e.key === "Escape") {
      onCancel(e);
    }
  };

  return (
    <DarkenedBackground>
      <DialogWindowContainer
        tabIndex="0"
        onKeyDown={(e) => handleKeyDown(e)}
        ref={dialog}
      >
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
