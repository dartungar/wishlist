import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const MenuItems = () => {
  const { isAuthorized, user, logout } = useContext(AuthContext);
  const { popAlert } = useContext(AlertContext);

  return (
    <ul>
      <li>
        <Link to="/search" title="Найти пользователя">
          Поиск
        </Link>
      </li>
      {isAuthorized ? (
        <>
          <li>
            <Link to={`/list/${user.public_url}`} title="Мой список">
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
                popAlert();
              }}
            >
              Выйти
            </a>
          </li>{" "}
        </>
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};

export default MenuItems;
