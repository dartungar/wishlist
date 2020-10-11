import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;
  border: 1px solid black;
  border-radius: 3px;
`;
const PriceContainer = styled.div`
  font-size: 1.7rem;
  margin: 1rem;
`;
const NameContainer = styled.div`
  margin: 0 1rem;
`;

const UrlContainer = styled.div`
  margin: 1rem;
`;

const BtnsContainer = styled.div``;

const Item = ({ item: { name, price, url } }) => {
  return (
    <ItemContainer>
      <PriceContainer>{price}</PriceContainer>
      <NameContainer>
        <h4>{name}</h4>
      </NameContainer>

      <UrlContainer>
        <a href={url}>{url}</a>
      </UrlContainer>
    </ItemContainer>
  );
};

export default Item;
