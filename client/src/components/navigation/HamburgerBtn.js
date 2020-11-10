import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";
import { fadein } from "../../style/animations";

const HamburgerContainer = styled.div`
  /* position: relative; */
  display: inline-block;
`;

const HamburgerIcon = styled.div`
  i {
    display: inline-block;
    font-size: 1.5rem;
    transform: ${(props) => (props.isTransformed ? "rotate(90deg)" : "none")};
    transition: transform 0.25s;
    color: ${(props) =>
      props.isTransformed
        ? (props) => props.theme.PRIMARY
        : (props) => props.theme.TEXT};
  }

  i:hover {
    color: ${(props) =>
      props.isTransformed
        ? (props) => props.theme.TEXT
        : (props) => props.theme.PRIMARY};
  }
`;

// store state: is hamburger menu open
// display based on is hamburger menu open
// animation on change state
const HamburgerBtn = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const location = useLocation();

  // hide menu on change url path
  useEffect(() => {
    if (location) {
      setShowHamburgerMenu(false);
    }
  }, [location]);

  const handleClick = (e) => {
    e.preventDefault();
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <HamburgerContainer>
      <HamburgerIcon isTransformed={showHamburgerMenu}>
        <a
          href=""
          title={showHamburgerMenu ? "Закрыть меню" : "Открыть меню"}
          onClick={handleClick}
        >
          {showHamburgerMenu ? (
            <i class="fas fa-times"></i>
          ) : (
            <i class="fas fa-bars"></i>
          )}
        </a>
      </HamburgerIcon>
      {showHamburgerMenu && <HamburgerMenu />}
    </HamburgerContainer>
  );
};

export default HamburgerBtn;
