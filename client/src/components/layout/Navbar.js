import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu";

const NavbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  @media (max-width: 300px) {
    justify-content: center;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo />
      <Menu />
    </NavbarContainer>
  );
};

export default Navbar;
