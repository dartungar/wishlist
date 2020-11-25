import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CollapsibleSection from "./CollapsibleSection";

const animationDuration = 0.3;

const CollapsibleSectionContainer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CollapsibleSection
      isOpen={isOpen}
      animation={animation}
      animationDuration={animationDuration}
      title={props.title}
      children={props.children}
      onClickTitle={handleClick}
    />
  );
};

export default CollapsibleSectionContainer;
