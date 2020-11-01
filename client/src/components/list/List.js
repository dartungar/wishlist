import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
import AddNewItemBtn from "./AddNewItemBtn";
import NewItemPrompt from "./NewItemPrompt";
import EditItemPrompt from "./EditItemPrompt";
import ListTitle from "./ListTitle";
import NewGifterModal from "./NewGifterModal";
import Spinner from "../layout/Spinner";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const ListContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const List = ({ show_my_wishlist }) => {
  const {
    loading,
    currentWishlist,
    getWishlist,
    addingNewItem,
    editedItem,
    newGifterModal,
  } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const { user_public_url } = useParams();

  useEffect(() => {
    if (user_public_url) {
      getWishlist(user_public_url);
    } else if (show_my_wishlist) {
      getWishlist(user.public_url);
    }
  }, [user_public_url]);

  return (
    <ListContainer>
      {newGifterModal && <NewGifterModal />}

      <ListTitle user={currentWishlist.user} />
      {loading && <Spinner />}
      {user &&
        currentWishlist.user.id === user.id &&
        (addingNewItem ? <NewItemPrompt /> : <AddNewItemBtn />)}
      {currentWishlist.items &&
        currentWishlist.items.length > 0 &&
        currentWishlist.items.map((item) => {
          if (editedItem && item.id === editedItem.id) {
            return <EditItemPrompt key={item.id} item={editedItem} />;
          } else {
            return <Item key={item.id} item={item} />;
          }
        })}
    </ListContainer>
  );
};

export default List;
