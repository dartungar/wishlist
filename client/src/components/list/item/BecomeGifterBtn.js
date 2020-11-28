import React, { useState, useEffect, useContext } from "react";
import ItemsContext from "../../../context/items/itemsContext";
import styled from "styled-components";

const GiftersInfoForMobileContainer = styled.div`
  display: inline-block;
  position: absolute;
  z-index: 100;
  background-color: ${(props) => props.theme.BASIC_BACKGROUND};
  box-shadow: 1px 1px 4px ${(props) => props.theme.BOX_SHADOW};
  padding: 0.5rem;
  border-radius: 3px;
`;

const BecomeGifterBtn = ({ item }) => {
  const { setNewGifterModal } = useContext(ItemsContext);
  const { gifters, group_purchase } = item;

  const [showGiftersInfoForMobile, setShowGiftersInfoForMobile] = useState(
    false
  );

  // show modal for becoming a gifter of item
  const onClickBooking = (e) => {
    e.preventDefault();
    setNewGifterModal({ item: item });
  };

  // on touch, show info about gifters
  const showGiftersInfo = (e) => {
    e.preventDefault();
    setShowGiftersInfoForMobile(true);
  };

  useEffect(() => {
    let timer;
    if (showGiftersInfoForMobile) {
      timer = setTimeout(() => setShowGiftersInfoForMobile(false), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showGiftersInfoForMobile]);

  return (
    <>
      {group_purchase ? (
        <a
          href="#"
          title={!gifters ? `Буду дарить` : `Буду дарить вместе с ${gifters}`}
          onClick={onClickBooking}
        >
          <i className="fas fa-users"></i>
        </a>
      ) : !gifters ? (
        <a href="#" title={`Буду дарить`} onClick={onClickBooking}>
          <i className="fas fa-gift"></i>
        </a>
      ) : (
        <>
          <i
            className="fas fa-gift"
            title={`Будет дарить ${gifters}`}
            style={{ opacity: "50%" }}
            onTouchStart={showGiftersInfo}
          ></i>
          {showGiftersInfoForMobile && (
            <GiftersInfoForMobileContainer>
              Будет дарить {gifters}
            </GiftersInfoForMobileContainer>
          )}
        </>
      )}
    </>
  );
};

export default BecomeGifterBtn;
