import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";

const MenuContainer = styled.ul`
  list-style: none;
  display: inline-block;

  li {
    display: inline;
    margin-left: 1rem;
  }
`;

const Menu = () => {
  const { isAuthorised, user } = useContext(AuthContext);

  return (
    <MenuContainer>
      <li>
        <span>Поиск пользователей</span>
      </li>
      <li>
        <Link to={`/list/${user.id}`}>Мой вишлист</Link>
      </li>
      <li>
        <Link to={`/profile`}>Профиль</Link>
      </li>
      <li>
        <span>Выйти</span>
      </li>
    </MenuContainer>
  );
};

export default Menu;
