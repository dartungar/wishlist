import React from "react";
import styled from "styled-components";
import MenuItems from "./MenuItems";

const MenuContainer = styled.div`
  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
  }

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

const HorizontalMenu = () => {
  return (
    <MenuContainer>
      <MenuItems />
    </MenuContainer>
  );
};

export default HorizontalMenu;
