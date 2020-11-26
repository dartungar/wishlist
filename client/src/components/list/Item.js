import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import { fadein } from "../../style/animations";
import DialogWindow from "../layout/DialogWindow";

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0 0;
  /* border: 1px solid ${(props) => props.theme.PRIMARY_LIGHT}; */
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

const GiftersInfoForMobileContainer = styled.div`
  display: inline-block;
  position: relative;
  right: 1rem;
  top: 1.1rem;
  z-index: 100;
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
  const [showGiftersInfoForMobile, setShowGiftersInfoForMobile] = useState(
    false
  );

  // handle controlled input change
  const onEdit = (e) => {
    e.preventDefault();
    setEditedItem(item);
  };

  // delete item, refresh wishlist
  const onDelete = (e) => {
    e.preventDefault();
    deleteItem(id);
    if (user) getWishlist(user.public_url);
  };

  // on confirming delete, delete and hide dialog
  const onConfirmDelete = (e) => {
    onDelete(e);
    setShowDeleteItemsDialog(false);
  };

  // on cancelling delete, hide dialog
  const onCancelDelete = (e) => {
    e.preventDefault();
    setShowDeleteItemsDialog(false);
  };

  // clear gifters and refresh wishlist
  const onCleargifters = (e) => {
    e.preventDefault();
    updateItem({
      ...item,
      gifters: null,
    });
    getWishlist(user.public_url);
  };

  // clear gifters and hide dialog
  const onConfirmClearGifters = (e) => {
    onCleargifters(e);
    setShowClearGiftersDialog(false);
  };

  // hide dialog
  const onCancelClearGifters = (e) => {
    e.preventDefault();
    setShowClearGiftersDialog(false);
  };

  // show modal for becoming a gifter of item
  const onClickBooking = (e) => {
    e.preventDefault();
    setNewGifterModal({ item: item });
  };

  const showGiftersInfo = (e) => {
    e.preventDefault();
    setShowGiftersInfoForMobile(true);
  };

  useEffect(() => {
    let timer;
    if (showGiftersInfoForMobile) {
      timer = setTimeout(() => setShowGiftersInfoForMobile(false), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showGiftersInfoForMobile]);

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
                href="#"
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
              href="#"
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
              href="#"
              title={
                !gifters ? `Буду дарить` : `Буду дарить вместе с ${gifters}`
              }
              onClick={onClickBooking}
            >
              <i className="fas fa-users"></i>
            </a>
          ) : !gifters ? (
            <a href="#" title={`Буду дарить`} onClick={onClickBooking}>
              <i className="fas fa-gift"></i>
            </a>
          ) : (
            <>
              <i
                className="fas fa-gift"
                title={`Будет дарить ${gifters}`}
                style={{ opacity: "50%" }}
                onTouchStart={showGiftersInfo}
              ></i>
              {showGiftersInfoForMobile && (
                <GiftersInfoForMobileContainer>
                  Будет дарить {gifters}
                </GiftersInfoForMobileContainer>
              )}
            </>
          )}
        </LeftBtnsContainer>
      )}
    </ItemContainer>
  );
};

export default Item;
