import React from "react";
import PropTypes from "prop-types";
import {
  TwitterShareButton,
  FacebookShareButton,
  VKShareButton,
  TelegramShareButton,
} from "react-share";
import styled from "styled-components";

const PopupContainer = styled.div`
  i {
    font-size: 1.1rem;
    :hover {
      color: ${(props) => props.theme.PRIMARY};
    }
  }
`;

const SharePopup = ({ shareData }) => {
  // prevent popup from losing focus when popup is clicked
  const preventBlur = (e) => {
    e.preventDefault();
  };

  return (
    <PopupContainer onMouseDown={preventBlur}>
      <TwitterShareButton url={shareData.url} title={shareData.text}>
        <i class="fab fa-twitter" title="Твитнуть"></i>
      </TwitterShareButton>
      <FacebookShareButton url={shareData.url} quote={shareData.text}>
        <i class="fab fa-facebook-square" title="Отправить в Facebook"></i>
      </FacebookShareButton>
      <VKShareButton url={shareData.url} title={shareData.text}>
        <i class="fab fa-vk" title="Отправить в VK"></i>
      </VKShareButton>
      <TelegramShareButton url={shareData.url} title={shareData.text}>
        <i class="fab fa-telegram-plane" title="Отправить в Telegram"></i>
      </TelegramShareButton>
    </PopupContainer>
  );
};

SharePopup.propTypes = {
  isSmall: PropTypes.bool.isRequired,
  shareData: PropTypes.object.isRequired,
};

export default SharePopup;
