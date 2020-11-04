import React from "react";
import LogoIcon from "./LogoIcon";
import styled from "styled-components";

const LogoContainer = styled.div`
  position: relative;
  min-width: 17ch;
  h1 {
    display: inline-block;
    /* margin-bottom: 1rem; */
    font-size: 1.3rem;
    font-weight: bold;
  }
  p {
    position: absolute;
    top: 2.4rem;
    left: 2.5rem;
    font-size: 0.6rem;
  }
`;

const IconContainer = styled.span`
  position: relative;
  top: 0.6rem;
  font-size: 1.5rem;
  width: 30px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <h1>
        <IconContainer>
          <LogoIcon />
        </IconContainer>{" "}
        WishLis
      </h1>
      <p>ваш список желаний</p>
    </LogoContainer>
  );
};

export default Logo;
