import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import styled from "styled-components";

const UsernameInputContainer = styled.div`
  button {
    background-color: ${(props) => props.theme.BACKGROUND};
    border: none;
    font-size: 1rem;
  }
`;

const CancelBtn = styled.button`
  i {
    color: ${(props) => props.theme.DANGER};
  }
  i:hover {
    color: ${(props) => props.theme.DANGER_DARK};
  }
`;

const SaveBtn = styled.button`
  i {
    color: ${(props) => props.theme.SUCCESS};
  }
  i:hover {
    color: ${(props) => props.theme.SUCCESS_DARK};
  }
`;

const EditUsernameInput = ({ closeInput }) => {
  const { user, changeUserInfo } = useContext(AuthContext);

  const [editedName, setEditedName] = useState(user.name);

  const onChange = (e) => {
    setEditedName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeUserInfo({
      ...user,
      name: editedName,
    });
    closeInput();
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      onSubmit(e);
    } else if (e.key === "Escape") {
      closeInput();
    }
  };

  return (
    <UsernameInputContainer>
      <form action="" onSubmit={onSubmit} onKeyUp={handleKeyUp}>
        <input type="text" value={editedName} onChange={onChange} />
        <CancelBtn onClick={closeInput} title="Отмена">
          <i className="fas fa-times"></i>
        </CancelBtn>
        <SaveBtn type="submit" title="Сохранить">
          <i className="fas fa-check"></i>
        </SaveBtn>
      </form>
    </UsernameInputContainer>
  );
};

export default EditUsernameInput;
