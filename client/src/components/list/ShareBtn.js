import React, { useState } from "react";
import PropTypes from "prop-types";
import SharePopup from "./SharePopup";
import styled from "styled-components";

const BtnContainer = styled.div`
  margin-left: 0rem;
  margin-right: auto;
  display: inline-block;
  padding: 5px;
  color: ${(props) => props.theme.TEXT_LIGHT};
  font-size: 0.8rem;
  width: 15ch;
  border-radius: 3px;

  &:hover {
    background-color: ${(props) => props.theme.BACKGROUND};
    /* border-color: ${(props) => props.theme.PRIMARY_LIGHT}; */
    box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};
    transition: box-shadow 0.3s;
  }

  :focus,
  :focus-visible,
  :active {
    outline: none;
  }

  i {
    margin-right: 0.4rem;
  }

  @media (max-width: 300px) {
    margin-right: auto;
  }

  cursor: pointer;
`;

const ShareButton = ({ url, title, text }) => {
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(true);

  const shareData = {
    url: url,
    title: title,
    text: text,
  };

  // share
  const share = () => {
    // if native share abailable & user did not cancel share - show native share
    if (navigator.share && showNativeShare) {
      navigator.share(shareData).catch(setShowNativeShare(false)); // catch native share promise rejection
      // else show custom share popup
    } else if (!navigator.share) {
      setIsPopupShown(true);
    }
  };

  // hide custom share popup, if it is shown
  const cancelShare = () => {
    if (isPopupShown) {
      setIsPopupShown(false);
    }
  };

  // props.isSmall determines style of share button
  // big for Generator page, small for Ranking
  return (
    <BtnContainer
      role="button"
      tabIndex="0"
      onFocus={share}
      onBlur={cancelShare}
      title="Поделиться"
    >
      {isPopupShown ? (
        <SharePopup shareData={shareData} />
      ) : (
        <>
          <i class="fas fa-share-alt"></i> Поделиться
        </>
      )}
    </BtnContainer>
  );
};

ShareButton.propTypes = {
  isSmall: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ShareButton;
