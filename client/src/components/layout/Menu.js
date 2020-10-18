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
  const { isAuthorised, user, logout } = useContext(AuthContext);

  if (isAuthorised === true) {
    return (
      <MenuContainer>
        <li>
          <Link to="/search" title="Найти пользователя">
            Поиск
          </Link>
        </li>
        <li>
          <Link to={`/list/${user.id}`} title="Мой список">
            Мой список
          </Link>
        </li>
        <li>
          <Link to="/profile" title="Профиль">
            Профиль
          </Link>
        </li>
        <li>
          <a
            href=""
            title="Выйти"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Выйти
          </a>
        </li>
      </MenuContainer>
    );
  } else {
    return (
      <MenuContainer>
        <li>
          <Link to="/search" title="Найти пользователя">
            Поиск
          </Link>
        </li>

        <li>
          <Link to="/login" title="Вход">
            Вход
          </Link>
        </li>
        <li>
          <Link to="/register" title="Регистрация">
            Регистрация
          </Link>
        </li>
      </MenuContainer>
    );
  }
};

export default Menu;
