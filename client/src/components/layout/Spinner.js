import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  height: 90px;
  text-align: center;
  animation: 2s infinite pulse;

  @keyframes pulse {
    from {
      font-size: 80%;
      transform: translateX(80px) translateY(0px);
    }

    to {
      font-size: 200%;
      transform: translateX(0px) translateY(80px);
      opacity: 0%;
    }
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <span>🌠</span>
    </SpinnerContainer>
  );
};

export default Spinner;
