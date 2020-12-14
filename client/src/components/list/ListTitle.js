import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const Title = styled.h1`
  a {
    position: relative;
    bottom: 3px;
    font-size: 1rem;
  }
`;

const ListTitle = ({ listOwner }) => {
  const {
    favoriteUsers,
    getFavoriteUsers,
    addFavoriteUser,
    removeFavoriteUser,
    checkIfUserIsInFavorites,
  } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [isWishlistOwnerInFavorites, setIsWishlistOwnerInFavorites] = useState(
    false
  );

  // if wishlist owner in favorites, set state accordingly
  // if favorite users are not loaded yet, JUST DO IT
  useEffect(() => {
    if (favoriteUsers && user && listOwner.id) {
      const isInFavorites = checkIfUserIsInFavorites(listOwner.id);
      if (isInFavorites) setIsWishlistOwnerInFavorites(true);
    } else if (!favoriteUsers && user) {
      getFavoriteUsers(user.id);
    }
  }, [favoriteUsers, user, listOwner.id]);

  // add to faves & change state accordingly
  const onClickAddToFavorites = (e) => {
    e.preventDefault();
    addFavoriteUser(user.id, listOwner.id);
    setIsWishlistOwnerInFavorites(true);
  };

  // remove from faves & change state accordingly
  const onClickRemoveFromFavorites = (e) => {
    e.preventDefault();
    removeFavoriteUser(user.id, listOwner.id);
    setIsWishlistOwnerInFavorites(false);
  };

  return (
    <Title>
      {listOwner.name}{" "}
      {user &&
        favoriteUsers &&
        listOwner.id !== user.id &&
        (isWishlistOwnerInFavorites ? (
          <a
            href=""
            onClick={onClickRemoveFromFavorites}
            title="Добавить в избранные"
          >
            <i className="fas fa-star"></i>
          </a>
        ) : (
          <a
            href=""
            onClick={onClickAddToFavorites}
            title="Убрать из избранных"
          >
            <i className="far fa-star"></i>
          </a>
        ))}
    </Title>
  );
};

ListTitle.propTypes = {
  listOwner: PropTypes.string.isRequired,
};

export default ListTitle;
