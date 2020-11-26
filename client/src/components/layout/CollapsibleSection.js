import React, { useState } from "react";
import styled from "styled-components";

const Title = styled.h3`
  cursor: pointer;
`;

const ChildrenContainer = styled.div`
  /* max-height: ${(props) => (props.isOpen ? "1000px" : 0)};
  display: ${(props) => (props.isOpen ? "block" : "none")}; 
  transition: all ${(props) => props.animationDuration}s linear; */
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  display: inline-block;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform ${(props) => props.animationDuration}s;
`;

const CollapsibleSection = ({
  isOpen,
  animation,
  animationDuration,
  onClickTitle,
  title,
  children,
}) => {
  console.log("animationDuration:", animationDuration);
  return (
    <div>
      <Title onClick={() => onClickTitle()}>
        <Icon isOpen={isOpen} animationDuration={animationDuration}>
          <i class="fas fa-angle-right"></i>
        </Icon>{" "}
        {title}
      </Title>

      <ChildrenContainer isOpen={isOpen} animationDuration={animationDuration}>
        {isOpen && children}
      </ChildrenContainer>
    </div>
  );
};

export default CollapsibleSection;
