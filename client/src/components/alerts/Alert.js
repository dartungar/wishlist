import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AlertContext from "../../context/alert/alertContext";
import { fadein } from "../../style/animations";

const AlertContainer = styled.div`
  z-index: 100;
  position: sticky;
  top: 50px;
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
  animation: 0.2s ${fadein} linear;
  opacity: 0.85;
  transition: opacity 0.1s;

  a {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
  }
`;

const Alert = () => {
  const { alerts, popAlert } = useContext(AlertContext);
  const [currentAlert, setCurrentAlert] = useState();

  // show the newest alert
  useEffect(() => {
    const [alert] = alerts.slice(-1);
    console.log("Alerts: ", alerts, alert);
    setCurrentAlert(alert);
  }, [alerts]);

  // remove the newest alert from alerts stack
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
