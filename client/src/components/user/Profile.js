import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";
import EditUserNameInput from "./EditUsernameInput";
import EditBirthdayInput from "./EditBirthdayInput";

const ProfileContainer = styled.div`
  h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  a i {
    margin-left: 1rem;
  }
`;

const Profile = () => {
  const {
    user: { name, public_url, birthday },
  } = useContext(AuthContext);
  const [showEditUsernameInput, setShowEditUsernameInput] = useState(false);

  const onClickEdit = (e) => {
    e.preventDefault();
    setShowEditUsernameInput(true);
  };

  const closeInput = (e) => {
    setShowEditUsernameInput(false);
  };

  const onCopyUrl = (e) => {
    e.preventDefault();
  };

  return (
    <ProfileContainer>
      <h1>Профиль</h1>
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
        <i class="far fa-copy"></i>
      </a>

      <EditBirthdayInput />
    </ProfileContainer>
  );
};

export default Profile;
