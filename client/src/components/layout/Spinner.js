import React from "react";
import styled from "styled-components";

const DarkenedBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(252, 255, 255, 0.7);
`;

const TextContainer = styled.div`
  position: relative;
  top: 100px;
  z-index: 200;
  display: inline-block;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  z-index: 300;
  position: absolute;
  height: 90px;
  text-align: center;
  animation: 2s infinite pulse;

  @keyframes pulse {
    from {
      font-size: 80%;
      transform: translateX(80px) translateY(-80px);
    }

    to {
      font-size: 300%;
      transform: translateX(-80px) translateY(80px);
      opacity: 0%;
    }
  }
`;

const Spinner = () => {
  return (
    <DarkenedBackground>
      <SpinnerContainer>
        <span>🌠</span>
      </SpinnerContainer>
      <TextContainer>Загрузка...</TextContainer>
    </DarkenedBackground>
  );
};

export default Spinner;
