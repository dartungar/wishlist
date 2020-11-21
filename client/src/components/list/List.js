import React, { useEffect, useContext, useState } from "react";
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
  h1 {
    margin-bottom: 0.5rem;
  }
  small {
    color: ${(props) => props.theme.TEXT_LIGHT};
    margin-bottom: 1.5rem;
  }
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
  const [birthday, setBirthday] = useState();
  const [dispayedBirthday, setDisplayedBirthday] = useState();
  const [dateDiff, setDateDiff] = useState();

  // if user is viewing his wishlist, load it
  // else load wishlist of target user (from URL params)
  useEffect(() => {
    if (user_public_url) {
      getWishlist(user_public_url);
    } else if (show_my_wishlist) {
      getWishlist(user.public_url);
    }
  }, [user_public_url]);

  // calculate birthday data for display
  // wish you were here, Python (or maybe I am just a JS noob)
  useEffect(() => {
    if (currentWishlist) {
      const bday = new Date(currentWishlist.user.birthday);
      setBirthday(bday);
      const displayedBday = `${bday.getDate()}.${bday.getMonth() + 1}`;
      setDisplayedBirthday(displayedBday);
      const now = new Date();
      const bdayThisYear = new Date(
        now.getFullYear(),
        bday.getMonth(),
        bday.getDate()
      );
      let closestNextBday;
      if (bdayThisYear > now) {
        closestNextBday = bdayThisYear;
      } else if (bdayThisYear < now) {
        closestNextBday = new Date(
          now.getFullYear() + 1,
          bday.getMonth(),
          bday.getDate()
        );
      } else closestNextBday = now;
      setDateDiff(Math.round((closestNextBday - now) / 8.64e7));
    }
  }, [currentWishlist]);

  return (
    <ListContainer>
      {newGifterModal && <NewGifterModal />}

      <ListTitle listOwner={currentWishlist.user} />

      <small>
        {currentWishlist.user.birthday &&
          currentWishlist.user.birthday !== "None" && (
            <span>
              День рождения: {dispayedBirthday}. Дней до следующего дня
              рождения: {dateDiff}
            </span>
          )}
      </small>
      {loading && <Spinner />}
      {user &&
        currentWishlist.user.id === user.id &&
        (addingNewItem ? <NewItemPrompt /> : <AddNewItemBtn />)}
      {currentWishlist.items && currentWishlist.items.length > 0
        ? currentWishlist.items.map((item) => {
            if (editedItem && item.id === editedItem.id) {
              return <EditItemPrompt key={item.id} item={editedItem} />;
            } else {
              return <Item key={item.id} item={item} />;
            }
          })
        : !addingNewItem && <p>Список желаний пока пуст.</p>}
    </ListContainer>
  );
};

export default List;
