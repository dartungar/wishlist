import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import EditUserNameInput from "./EditUsernameInput";
import EditBirthdayInput from "./EditBirthdayInput";
import EditThemeInput from "./EditThemeInput";

const ProfileContainer = styled.div`
  h4 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  a i {
    margin-left: 1rem;
  }
`;

const Settings = () => {
  const {
    user: { name, public_url },
  } = useContext(AuthContext);
  const [showEditUsernameInput, setShowEditUsernameInput] = useState(false);

  // controlled input change handling
  const onClickEdit = (e) => {
    e.preventDefault();
    setShowEditUsernameInput(true);
  };

  // close Edit Username input
  const closeInput = (e) => {
    setShowEditUsernameInput(false);
  };

  // copy user's wishlist URL to clipboard
  const onCopyUrl = (e) => {
    e.preventDefault();
    const currentURL = `${window.location.protocol}//${window.location.hostname}`;
    navigator.clipboard.writeText(`${currentURL}/list/${public_url}`);
  };

  return (
    <ProfileContainer>
      <h1>Настройки</h1>
      <h4>Отображаемое имя</h4>
      {showEditUsernameInput ? (
        <EditUserNameInput closeInput={closeInput} />
      ) : (
        <>
          {" "}
          <span>{name}</span>{" "}
          <a href="" onClick={onClickEdit} title="Редактировать">
            <i className="fas fa-edit"></i>
          </a>
        </>
      )}

      <h4>Идентификатор</h4>

      <a href={`/list/${public_url}`}>{public_url}</a>
      <a href="" onClick={onCopyUrl} title="Копировать ссылку на мой список">
        <i className="far fa-copy"></i>
      </a>
      <EditBirthdayInput />
      <EditThemeInput />
    </ProfileContainer>
  );
};

export default Settings;
