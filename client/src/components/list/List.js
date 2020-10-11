import React from "react";
import styled from "styled-components";
import Item from "./Item";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 70%;
`;

const testItem = {
  name: "Офигенно нужная штукенция, которую я сам себе никогда бы не купил",
  price: "3000 Р",
  url: "https://www.ozon.ru/context/detail/id/167083349/",
};

const List = () => {
  return (
    <ListContainer>
      <Item item={testItem} />
      <Item item={testItem} />
      <Item item={testItem} />
      <Item item={testItem} />
      <Item item={testItem} />
    </ListContainer>
  );
};

export default List;
