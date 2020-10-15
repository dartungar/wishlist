import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/auth/authContext";

const MenuContainer = styled.ul`
  list-style: none;
  display: inline-block;
  padding: 0;

  li {
    display: inline;
    margin-left: 1.5rem;
  }

  li i {
    font-size: 1.1rem;
  }

  @media (max-width: 500px) {
    li {
      margin: 0 1.5rem;
    }
  }
`;

const Menu = () => {
  const { isAuthorised, user } = useContext(AuthContext);

  return (
    <MenuContainer>
      <li>
        <Link title="Найти пользователя">
          <i class="fas fa-search"></i>
        </Link>
      </li>
      <li>
        <Link to={`/list/${user.id}`} title="Мой список">
          <i class="fas fa-list"></i>
        </Link>
      </li>
      <li>
        <Link to={`/profile`} title="Профиль">
          <i class="fas fa-user-circle"></i>
        </Link>
      </li>
      <li>
        <Link title="Выйти">
          <i class="fas fa-sign-out-alt"></i>
        </Link>
      </li>
    </MenuContainer>
  );
};

export default Menu;
