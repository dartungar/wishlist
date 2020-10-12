import React from "react";
import styled from "styled-components";

const LogoContainer = styled.h1`
  display: inline-block;
  /* margin-bottom: 1rem; */
  font-size: 1.3rem;
  font-weight: bold;
`;

const Logo = () => {
  return <LogoContainer>🌠 Wishlist</LogoContainer>;
};

export default Logo;
