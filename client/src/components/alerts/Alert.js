import React, { useState, useContext, useEffect } from "react";
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
  opacity: 0.8;
  a {
    position: absolute;
    right: 1rem;
  }
`;

const Alert = () => {
  const { alerts, popAlert } = useContext(AlertContext);
  const [currentAlert, setCurrentAlert] = useState();

  useEffect(() => {
    const [alert] = alerts.slice(-1);
    console.log("Alerts: ", alerts, alert);
    setCurrentAlert(alert);
  }, [alerts]);

  const onCloseAlert = (e) => {
    e.preventDefault();
    popAlert();
  };

  if (currentAlert) {
    return (
      <AlertContainer alertColor={currentAlert.type}>
        {currentAlert.text}
        <a href="" onClick={onCloseAlert} title="Закрыть">
          <i className="fas fa-times"></i>
        </a>
      </AlertContainer>
    );
  } else return null;
};

export default Alert;
