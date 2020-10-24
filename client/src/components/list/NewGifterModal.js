import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ItemsContext from "../../context/items/itemsContext";
import AuthContext from "../../context/auth/authContext";

const DarkenedBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(82, 82, 82, 0.7);
`;

const PromptContainer = styled.div`
  z-index: 200;
  max-width: 80%;
  background-color: #fcffff;
  border-radius: 3px;
  padding: 1rem;

  h4 {
    margin: 0;
  }

  input {
    display: block;
    width: 95%;
    margin: 1rem 0;
  }

  button {
    background-color: #fcffff;
    border: none;
    font-size: 1rem;
  }
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  margin: 0 1rem 0 auto;
  i {
    color: #733625;
  }
  i:hover {
    color: red;
  }
`;

const SaveBtn = styled.button`
  i {
    color: #2b6131;
  }
  i:hover {
    color: #5eb823;
  }
`;

const NewGifterModal = () => {
  const {
    newGifterModal,
    setNewGifterModal,
    updateItem,
    getWishlist,
  } = useContext(ItemsContext);
  const { user } = useContext(AuthContext);
  const [gifterName, setGifterName] = useState();

  useEffect(() => {
    if (!gifterName) {
      if (user.name) {
        setGifterName(user.name);
      } else {
        setGifterName("Аноним");
      }
    }
  }, []);

  const onChange = (e) => {
    setGifterName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateItem({
      ...newGifterModal.item,
      gifters: newGifterModal.item.gifters
        ? [...newGifterModal.item.gifters, gifterName]
        : [gifterName],
    });
    setNewGifterModal(null);
    getWishlist(newGifterModal.item.user_id);
  };

  const onCancel = () => {
    setNewGifterModal(null);
  };

  return (
    <DarkenedBackground>
      <PromptContainer>
        <h4>Ваше имя </h4>
        <small>опционально, увидят только другие дарители</small>
        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            name="gifterName"
            value={gifterName}
            autoFocus
            placeholder="ваше имя для координации с другими дарителями (опционально)"
            onChange={onChange}
          />
          <BtnsContainer>
            <CancelBtn onClick={onCancel} title="Отмена">
              <i class="fas fa-times"></i>
            </CancelBtn>
            <SaveBtn type="submit" title="Сохранить">
              <i class="fas fa-check"></i>
            </SaveBtn>
          </BtnsContainer>
        </form>
      </PromptContainer>
    </DarkenedBackground>
  );
};

export default NewGifterModal;