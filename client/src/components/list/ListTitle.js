import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const Title = styled.h1`
  @media (max-width: 500px) {
    text-align: center;
  }

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

  useEffect(() => {
    if (favoriteUsers && user && listOwner) {
      const isInFavorites = checkIfUserIsInFavorites(listOwner.id);
      if (isInFavorites) setIsWishlistOwnerInFavorites(true);
    } else if (!favoriteUsers && user) {
      getFavoriteUsers(user.id);
    }
  }, [favoriteUsers, user]);

  const onClickAddToFavorites = (e) => {
    e.preventDefault();
    addFavoriteUser(user.id, listOwner.id);
    setIsWishlistOwnerInFavorites(true);
  };

  const onClickRemoveFromFavorites = (e) => {
    e.preventDefault();
    removeFavoriteUser(user.id, listOwner.id);
    setIsWishlistOwnerInFavorites(false);
  };

  return (
    user && (
      <Title>
        {listOwner.name}{" "}
        {favoriteUsers &&
          listOwner.id !== user.id &&
          (isWishlistOwnerInFavorites ? (
            <a
              href=""
              onClick={onClickRemoveFromFavorites}
              title="Добавить в избранные"
            >
              <i class="fas fa-star"></i>
            </a>
          ) : (
            <a
              href=""
              onClick={onClickAddToFavorites}
              title="Убрать из избранных"
            >
              <i class="far fa-star"></i>
            </a>
          ))}
      </Title>
    )
  );
};

ListTitle.propTypes = {
  user_id: PropTypes.number.isRequired,
};

export default ListTitle;
