import React from "react";
import styled from "styled-components";
import MenuItems from "./MenuItems";
import { fadein } from "../../style/animations";

const HamburgerMenuContainer = styled.div`
  position: absolute;
  z-index: 300;
  top: 2.5rem;
  right: 1.5rem;
  background-color: ${(props) => props.theme.BACKGROUND};
  border-left: 1px ${(props) => props.theme.PRIMARY_LIGHT} solid;
  animation: 0.3s ${fadein} linear;
  ul {
    list-style: none;
    margin: 0;
    padding-left: 1rem;
  }

  li {
    margin: 0.5rem 0;
  }
`;

const HamburgerMenu = () => {
  return (
    <HamburgerMenuContainer>
      <MenuItems />
    </HamburgerMenuContainer>
  );
};

export default HamburgerMenu;
