import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import HorizontalMenu from "./HorizontalMenu";
import HamburgerBtn from "./HamburgerBtn";

const NavbarContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  /* @media (max-width: 500px) {
    justify-content: center;
  } */
`;

const Navbar = () => {
  const [showHamburgerBtn, setShowHamburgerBtn] = useState();

  // replace horizontal menu with hamburger menu button
  // on narrow screens
  useEffect(() => {
    if (!showHamburgerBtn && window.innerWidth < 800) {
      setShowHamburgerBtn(true);
    }
  }, []);

  return (
    <NavbarContainer>
      <Logo />
      {showHamburgerBtn ? <HamburgerBtn /> : <HorizontalMenu />}
    </NavbarContainer>
  );
};

export default Navbar;
