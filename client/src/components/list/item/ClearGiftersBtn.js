import React, { useState, useContext } from "react";
import DialogWindow from "../../layout/DialogWindow";
import ItemsContext from "../../../context/items/itemsContext";

const ClearGiftersBtn = ({ user, item }) => {
  const { updateItem, getWishlist } = useContext(ItemsContext);
  const [showClearGiftersDialog, setShowClearGiftersDialog] = useState(false);

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

  // clear gifters and refresh wishlist
  const onCleargifters = (e) => {
    e.preventDefault();
    updateItem({
      ...item,
      gifters: null,
    });
    getWishlist(user.public_url);
  };

  return (
    <>
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
    </>
  );
};

export default ClearGiftersBtn;
