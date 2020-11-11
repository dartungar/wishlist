import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import styled from "styled-components";
import CancelBtn from "../layout/CancelBtn";
import ConfirmBtn from "../layout/ConfirmBtn";

const UsernameInputContainer = styled.div``;

const EditUsernameInput = ({ closeInput }) => {
  const { user, changeUserInfo } = useContext(AuthContext);
  const [editedName, setEditedName] = useState(user.name);

  // controlled input change handling
  const onChange = (e) => {
    setEditedName(e.target.value);
  };

  // apply username change
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.name !== editedName) {
      changeUserInfo({
        ...user,
        name: editedName,
      });
    }

    closeInput();
  };

  // Enter and ESC support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    } else if (e.key === "Escape") {
      closeInput();
    }
  };

  return (
    <UsernameInputContainer>
      <form action="" onSubmit={onSubmit} onKeyDown={handleKeyDown}>
        <input type="text" value={editedName} onChange={onChange} />
        <CancelBtn onClick={closeInput} />
        <ConfirmBtn type="submit" onClick={onSubmit} />
      </form>
    </UsernameInputContainer>
  );
};

export default EditUsernameInput;
