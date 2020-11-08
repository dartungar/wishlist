import React, { useContext } from "react";
import styled from "styled-components";
import ItemsContext from "../../context/items/itemsContext";

const FavoritesItemContainer = styled.div`
  h4 {
    margin-top: 2.5rem;
  }

  i {
    margin-left: 1rem;
  }

  p i {
    font-size: 0.7rem;
  }
`;

const FavoritesItem = ({ owner, user }) => {
  const { removeFavoriteUser, getFavoriteUsers } = useContext(ItemsContext);

  const handleClick = (e) => {
    e.preventDefault();
    removeFavoriteUser(owner.id, user.id);
    getFavoriteUsers(user.id);
  };

  return (
    <FavoritesItemContainer>
      <h4>
        {user.name}
        {"  "}
        <a href="" onClick={handleClick} title="Убрать из избранных">
          <i className="fas fa-times"></i>
        </a>
      </h4>
      <p>
        <a href={`/list/${user.public_url}`} title="открыть профиль">
          {user.public_url}{" "}
        </a>

        <a
          href={`/list/${user.public_url}`}
          title="открыть профиль в новой вкладке"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-external-link-alt"></i>
        </a>
      </p>
    </FavoritesItemContainer>
  );
};

export default FavoritesItem;
