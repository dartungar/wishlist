import React, { useState, useContext } from "react";
import styled from "styled-components";
import DialogWindow from "../../layout/DialogWindow";
import ItemsContext from "../../../context/items/itemsContext";

const DeleteBtnContainer = styled.div`
  margin: 1rem 1rem 1rem auto;
  /* margin: 1rem; */
  i {
    margin-left: 1rem;
  }
`;

const RightBtnGroup = ({ user, item }) => {
  const { setEditedItem, deleteItem, getWishlist } = useContext(ItemsContext);
  const [showDeleteItemDialog, setShowDeleteItemsDialog] = useState(false);

  // handle controlled input change
  const onEdit = (e) => {
    e.preventDefault();
    setEditedItem(item);
  };

  // delete item, refresh wishlist
  const onDelete = (e) => {
    e.preventDefault();
    deleteItem(item.id);
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

  return (
    <>
      <DeleteBtnContainer>
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
      </DeleteBtnContainer>
      {showDeleteItemDialog && (
        <DialogWindow
          text="Удалить из списка желаний? Отменить это действие невозможно!"
          onConfirm={(e) => onConfirmDelete(e)}
          onCancel={(e) => onCancelDelete(e)}
        />
      )}
    </>
  );
};

export default RightBtnGroup;
