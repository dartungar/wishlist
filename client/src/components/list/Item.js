import React, { useContext, useState } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import { fadein } from "../../style/animations";
import DialogWindow from "../layout/DialogWindow";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  /* border: 1px solid ${(props) => props.theme.PRIMARY_LIGHT}; */
  border-radius: 3px;
  background-color: ${(props) => props.theme.BACKGROUND};
  box-shadow: 1px 1px 4px lightgray;
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
  /* margin: 1rem; */
  i {
    margin-left: 1rem;
  }
`;

const RightBtnsContainer = styled.div`
  margin: 1rem 1rem 1rem auto;
  /* margin: 1rem; */
  i {
    margin-left: 1rem;
  }
`;

const Item = ({ item }) => {
  const {
    setEditedItem,
    updateItem,
    deleteItem,
    getWishlist,
    setNewGifterModal,
  } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const { id, name, price, url, gifters, group_purchase, user_id } = item;
  const [showClearGiftersDialog, setShowClearGiftersDialog] = useState(false);
  const [showDeleteItemDialog, setShowDeleteItemsDialog] = useState(false);

  const onEdit = (e) => {
    e.preventDefault();
    setEditedItem(item);
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteItem(id);
    if (user) getWishlist(user.public_url);
  };

  const onConfirmDelete = (e) => {
    onDelete(e);
    setShowDeleteItemsDialog(false);
  };

  const onCancelDelete = (e) => {
    e.preventDefault();
    setShowDeleteItemsDialog(false);
  };

  const onCleargifters = (e) => {
    e.preventDefault();
    updateItem({
      ...item,
      gifters: null,
    });
    getWishlist(user.public_url);
  };

  const onConfirmClearGifters = (e) => {
    onCleargifters(e);
    setShowClearGiftersDialog(false);
  };

  const onCancelClearGifters = (e) => {
    e.preventDefault();
    setShowClearGiftersDialog(false);
  };

  const onClickBooking = (e) => {
    e.preventDefault();
    setNewGifterModal({ item: item });
  };

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
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowClearGiftersDialog(true);
                }}
                title="Очистить дарителей"
              >
                <i className="fas fa-user-times"></i>
              </a>
            </LeftBtnsContainer>
          )}
          {showClearGiftersDialog && (
            <DialogWindow
              text="Очистить список дарителей?"
              onConfirm={(e) => {
                onConfirmClearGifters(e);
              }}
              onCancel={(e) => {
                onCancelClearGifters(e);
              }}
            />
          )}
          <RightBtnsContainer>
            <a href="" onClick={onEdit} title="Редактировать">
              <i className="fas fa-edit"></i>
            </a>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteItemsDialog(true);
              }}
              title="Удалить"
            >
              <i className="fas fa-trash-alt"></i>
            </a>
          </RightBtnsContainer>
          {showDeleteItemDialog && (
            <DialogWindow
              text="Удалить из списка желаний? Отменить это действие невозможно!"
              onConfirm={(e) => onConfirmDelete(e)}
              onCancel={(e) => onCancelDelete(e)}
            />
          )}
        </>
      ) : (
        <LeftBtnsContainer>
          {group_purchase ? (
            <a
              href=""
              title={
                !gifters ? `Буду дарить` : `Буду дарить вместе с ${gifters}`
              }
              onClick={onClickBooking}
            >
              <i className="fas fa-users"></i>
            </a>
          ) : !gifters ? (
            <a href="" title={`Буду дарить`} onClick={onClickBooking}>
              <i className="fas fa-gift"></i>
            </a>
          ) : (
            <i
              className="fas fa-gift"
              title={`Будет дарить ${gifters}`}
              style={{ opacity: "50%" }}
            ></i>
          )}
        </LeftBtnsContainer>
      )}
    </ItemContainer>
  );
};

export default Item;
