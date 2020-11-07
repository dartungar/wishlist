import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import styled from "styled-components";
import CancelBtn from "../layout/CancelBtn";
import ConfirmBtn from "../layout/ConfirmBtn";

const BirthdayInputContainer = styled.div`
  input {
    border-radius: 3px;
  }

  small {
    color: ${(props) => props.theme.TEXT_LIGHT};
  }
`;

const EditBirthdayInput = () => {
  const { user, changeUserInfo } = useContext(AuthContext);
  const [editedBirthday, setEditedBirthday] = useState(user.birthday);
  const [previousValue, setPreviousValue] = useState();
  const [showBtns, setShowBtns] = useState(false);

  const onChange = (e) => {
    setPreviousValue(editedBirthday);
    setEditedBirthday(e.target.value);
    setShowBtns(true);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setEditedBirthday(previousValue);
    setShowBtns(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changeUserInfo({
      ...user,
      birthday: editedBirthday,
    });
    setShowBtns(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    } else if (e.key === "Escape") {
      onCancel(e);
    }
  };

  const now = new Date();
  const day = now.getDate() > 10 ? now.getDate() : `0${now.getDate()}`;
  const currentDate = `${now.getFullYear()}-${now.getMonth() + 1}-${day}`;

  return (
    <BirthdayInputContainer title="Редактировать дату рождения">
      <h4>День рождения</h4>

      <form action="" onSubmit={onSubmit} onKeyDown={handleKeyDown}>
        <input
          type="date"
          value={editedBirthday}
          onChange={onChange}
          min="1900-01-01"
          max={currentDate}
        />
        {showBtns && (
          <>
            {" "}
            <CancelBtn onClick={onCancel} />
            <ConfirmBtn type="submit" onClick={onSubmit} />
          </>
        )}
      </form>
      <small>другие пользователи увидят только день и месяц</small>
    </BirthdayInputContainer>
  );
};

export default EditBirthdayInput;
