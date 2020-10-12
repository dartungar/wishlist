import React from "react";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: inline-block;
  span {
    margin: 0 1rem;
  }
`;

const Menu = () => {
  return (
    <MenuContainer>
      <span>Поиск</span>
      <span>Выйти</span>
    </MenuContainer>
  );
};

export default Menu;
