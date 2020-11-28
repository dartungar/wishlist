import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import AuthContext from "../../../context/auth/authContext";
import { fadein } from "../../../style/animations";
import ClearGiftersBtn from "./ClearGiftersBtn";
import RightBtnGroup from "./RightBtnGroup";
import BecomeGifterBtn from "./BecomeGifterBtn";

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.BACKGROUND};
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};
  animation: 0.5s ${fadein} linear;
  a {
    text-decoration: none;
    color: black;
  }
`;

const NameContainer = styled.div`
  width: 100%;
  margin: 0 1rem;
`;

const PriceContainer = styled.div`
  margin: 1rem;
  width: 9ch;
`;

const UrlContainer = styled.div`
  margin: 1rem 0 1rem 1rem;
`;

const LeftBtnsContainer = styled.div`
  margin-right: auto;
  i {
    margin-left: 1rem;
  }
`;

const Item = ({ item }) => {
  const { user } = useContext(AuthContext);
  const { id, name, price, url, gifters, group_purchase, user_id } = item;

  return (
    <ItemContainer>
      <NameContainer>
        <p>{name}</p>
      </NameContainer>
      <PriceContainer>{price} ₽</PriceContainer>
      <UrlContainer>
        {url && (
          <a
            href={url}
            title="посмотреть в магазине"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        )}
      </UrlContainer>

      {user && user.id === user_id ? (
        <>
          {gifters && (
            <LeftBtnsContainer>
              <ClearGiftersBtn user={user} item={item} />
            </LeftBtnsContainer>
          )}

          <RightBtnGroup user={user} item={item} />
        </>
      ) : (
        <LeftBtnsContainer>
          <BecomeGifterBtn user={user} item={item} />
        </LeftBtnsContainer>
      )}
    </ItemContainer>
  );
};

export default Item;
