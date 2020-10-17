import React, { useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const Profile = () => {
  const { loading } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>Профиль</h1>
      <table>
        <tr>
          <td>Отображаемое имя</td>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>Ссылка на вишлист</td>
          <td>
            <a href={`/list/${user.id}`}>{`/list/${user.id}`}</a>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Profile;
