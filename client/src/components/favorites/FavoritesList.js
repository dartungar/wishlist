import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";
import FavoritesItem from "./FavoritesItem";

const FavoritesContainer = styled.div``;

const FavoritesList = () => {
  const { favoriteUsers, getFavoriteUsers } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getFavoriteUsers(user.id);
  }, []);

  return (
    <FavoritesContainer>
      <h2>Избранные пользователи</h2>
      {favoriteUsers && favoriteUsers.length > 0 ? (
        favoriteUsers.map((u) => (
          <FavoritesItem key={u.id} user={u} owner={user} />
        ))
      ) : (
        <p>
          Чтобы добавить пользователя в избранные, кликните на{" "}
          <i class="far fa-star"></i> рядом с его именем в списке желаний.
          <p>
            <a href="/search">Найти пользователей</a>
          </p>
        </p>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesList;
