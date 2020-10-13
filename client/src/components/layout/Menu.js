import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: inline-block;
  span {
    margin-left: 1rem;
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <span>Поиск пользователей</span>
      <span>Мой вишлист</span>
      <span>Выйти</span>
    </MenuContainer>
  );
};

export default Menu;
