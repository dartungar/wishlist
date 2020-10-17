import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.h1`
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const ListTitle = ({ user }) => {
  return user && <Title>{user.name}</Title>;
};

ListTitle.propTypes = {
  user_id: PropTypes.number.isRequired,
};

export default ListTitle;
