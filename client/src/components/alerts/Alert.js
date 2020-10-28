import React, { useContext } from "react";
import styled from "styled-components";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import ItemsContext from "../../context/items/itemsContext";

const AlertContainer = styled.div`
  z-index: 100;
  position: sticky;
  top: 50px;
  height: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  line-height: 2rem;
  background-color: ${(props) => {
    if (props.alertColor === "success") {
      return props.theme.SUCCESS;
    } else if (props.alertColor === "danger") {
      return props.theme.DANGER;
    } else return props.theme.PRIMARY;
  }};
  a {
    position: absolute;
    right: 1rem;
  }
`;

const Alert = () => {
  const { alert, clearAlert } = useContext(AlertContext);
  const { authError, setAuthError } = useContext(AuthContext);
  const { itemsError, setItemsError } = useContext(ItemsContext);

  const onCloseAlert = (e) => {
    e.preventDefault();
    clearAlert();
    setAuthError(null);
    setItemsError(null);
  };

  return (
    <AlertContainer alertColor={alert.type}>
      {alert.text}
      <a href="" onClick={onCloseAlert} title="Закрыть">
        <i className="fas fa-times"></i>
      </a>
    </AlertContainer>
  );
};

export default Alert;
